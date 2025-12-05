import EventCard from "@/components/eventCard";
import ExploreBtn from "@/components/exploreBtn";

export const mockEvents = [
  {
    title: "Tech Meetup 2025",
    image: "/images/event1.png",
    slug: "tech-meetup-2025",
    location: "Shenzhen Convention Center",
    date: "2025-03-12",
    time: "18:30",
  },
  {
    title: "Summer Music Fest",
    image: "/images/event2.png",
    slug: "summer-music-fest-2025",
    location: "Nanshan Park",
    date: "2025-06-21",
    time: "16:00",
  },
  {
    title: "Design Thinking Workshop",
    image: "/images/event3.png",
    slug: "design-thinking-workshop",
    location: "Tencent HQ - Room A",
    date: "2025-04-05",
    time: "09:30",
  },
  {
    title: "Startup Pitch Night",
    image: "/images/event4.png",
    slug: "startup-pitch-night",
    location: "Maker Space",
    date: "2025-05-14",
    time: "19:00",
  },
  {
    title: "Photography Walk",
    image: "/images/event5.png",
    slug: "photography-walk-2025",
    location: "Old Town",
    date: "2025-07-03",
    time: "07:00",
  },
  {
    title: "AI & Ethics Panel",
    image: "/images/event6.png",
    slug: "ai-ethics-panel",
    location: "University Auditorium",
    date: "2025-08-29",
    time: "14:00",
  },
];

const Home = () => {
  return (
    <div>
      <h1 className="text-center">
        The hub for Every Dev <br /> Event You Can&apos;t Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {mockEvents &&
            mockEvents.length > 0 &&
            mockEvents.map((event: IEvent) => (
              <li key={event.title} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
