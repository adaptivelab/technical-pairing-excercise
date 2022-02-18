// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const {amount, duration} = req.body
  let payments = Number(amount) / Number(duration);

  if (isNaN(payments)) {
    payments = '';
  }

  res.send({
    payments
  })
}
