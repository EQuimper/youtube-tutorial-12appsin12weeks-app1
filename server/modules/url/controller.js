import Url from './model';

export const createShort = (req, res) => {
  const { longUrl } = req.body;

  const newUrl = new Url({ longUrl });

  newUrl.save()
    .then(
      url => res.status(201).json({ url }),
      error => res.status(400).json({ error })
    );
};
