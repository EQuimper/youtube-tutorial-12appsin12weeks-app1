import { isURL } from 'validator';
import Url from './model';

export const createShort = (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ message: 'You must provided a url.' });
  } else if (!isURL(longUrl)) {
    return res.status(400).json({ message: 'You must provided a valid url.' });
  }

  Url.findOne({ longUrl })
    .then(
      url => {
        if (!url) {
          const newUrl = new Url({ longUrl });
          return newUrl.save()
            .then(
              u => res.status(201).json({ url: u }),
              error => res.status(500).json({ error })
            );
        }

        return res.status(200).json({ url });
      },
      error => res.status(500).json({ error })
    );
};
