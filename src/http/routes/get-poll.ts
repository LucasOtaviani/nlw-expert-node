import z from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"
import { redis } from "../../lib/redis"

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (request, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })
  
    const { pollId } = getPollParams.parse(request.params)
  
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          }
        }
      },
    })

    if (!poll) {
      return reply.status(400).send({
        message: 'Poll not found.'
      })
    }

    const scores = await redis.zrange(`poll:${pollId}`, 0, -1, `WITHSCORES`)

    const votes = scores.reduce((carry, redisRecord, index) => {
      if (index % 2 === 0) {
        const score = scores[index + 1]

        Object.assign(carry, {
          [redisRecord]: Number(score)
        })
      }

      return carry
    }, {} as Record<string, number>)

    return reply.send({
      id: poll.id,
      title: poll.title,
      options: poll.options.map(option => {
        return {
          id: option.id,
          title: option.title,
          votes: votes[option.id] || 0
        }
      }),
    })
  })
}