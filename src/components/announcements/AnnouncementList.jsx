import AnnouncementCard from "./AnnouncementCard/AnnouncementCard";

function normalizeDate(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function getDateLabel(date) {
  const today = normalizeDate(new Date());
  const target = normalizeDate(date);

  const diff = (today - target) / (1000 * 60 * 60 * 24);

  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return target.toLocaleDateString('en-ZA');
}

function groupAnnouncements(announcements) {
  const groups = {};

  announcements.forEach((a) => {
    if (!a.createdAt) return;

    const label = getDateLabel(new Date(a.createdAt));
    if (!groups[label]) groups[label] = [];
    groups[label].push(a);
  });

  return groups;
}

export default function AnnouncementList({ announcements }) {
  if (!announcements || announcements.length === 0) {
    return <p>No announcements available.</p>;
  }

  const grouped = groupAnnouncements(announcements);
  const sortedLabels = Object.keys(grouped).sort((a, b) => {
    const dateA = normalizeDate(grouped[a][0].createdAt);
    const dateB = normalizeDate(grouped[b][0].createdAt);
    return dateB - dateA;
  });

  return (
    <div>
      {sortedLabels.map((label) => (
        <section key={label} style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '0.5rem' }}>{label}</h4>
          {grouped[label].map((a) => (
            <AnnouncementCard key={a._id} data={a} />
          ))}
        </section>
      ))}
    </div>
  );
}