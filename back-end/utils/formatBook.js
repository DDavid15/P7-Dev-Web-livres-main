const generateStars = (averageRating, bookId) => {
  const full = Math.floor(averageRating);
  const empty = 5 - full;

  return [
    ...Array.from({ length: full }, (_, i) => ({
      type: 'full',
      id: `${bookId}-full-${i}`,
    })),
    ...Array.from({ length: empty }, (_, i) => ({
      type: 'empty',
      id: `${bookId}-empty-${i}`,
    })),
  ];
};

module.exports = (book) => {
  const bookObj = book.toObject?.() || book;

  const bookId = bookObj._id?.toString?.() || bookObj.id || `fallback-${Date.now()}-${Math.random()}`;

  return {                   
    _id: bookObj._id,               // Pour compatibilité avec un front qui l'attend
    title: bookObj.title,
    author: bookObj.author,
    imageUrl: bookObj.imageUrl,
    year: bookObj.year,
    genre: bookObj.genre,
    averageRating: bookObj.averageRating,
    ratings: (bookObj.ratings || []).map(({ _id, ...rest }) => ({
      ...rest,
    })),
    stars: generateStars(bookObj.averageRating, bookId),
    userId: bookObj.userId,
  };
};
