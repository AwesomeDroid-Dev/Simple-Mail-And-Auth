import { readByUserId } from '../DBtools/read.js';

export default (req, res) => {
  const userId = getCookieValue(req, 'userId');
  if (!userId) {
    return res.status(401).json({ message: 'Failed to fetch' });
  }

  readByUserId(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Cookie Expired' });
      }
      res.status(200).json({ name: user.username });
    })
    .catch(err => res.status(500).json({ message: 'Internal Server Error' }));
};

const getCookieValue = (req, key) => {
  const value = req.headers.cookie
    .split(';')
    .find(c => c.trim().startsWith(`${key}=`))
    ?.split('=')[1];

  return value ? Number(value) : undefined;
};

