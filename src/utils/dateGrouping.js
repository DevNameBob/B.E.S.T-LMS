export function groupAnnouncementsByDate(announcements) {
  const now = new Date();
  const today = [];
  const yesterday = [];
  const thisWeek = [];
  const earlier = [];

  announcements.forEach((announcement) => {
    const createdAt = new Date(announcement.createdAt);
    const diffInMs = now - createdAt;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      today.push(announcement);
    } else if (diffInDays === 1) {
      yesterday.push(announcement);
    } else if (diffInDays <= 7) {
      thisWeek.push(announcement);
    } else {
      earlier.push(announcement);
    }
  });

  return {
    today,
    yesterday,
    thisWeek,
    earlier,
  };
}