const pathHandler = (req, res, next) => {
  const mesagge = `${req.method} ${req.url} not found path`;
  console.error(mesagge);
  return res.status(404).json({ mesagge });
};

export default pathHandler;
