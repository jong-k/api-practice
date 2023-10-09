import ListItem from "./ListItem.jsx";

export default function List() {
  return (
    <ul className="list">
      {Array(10)
        .fill(0)
        .map((x, i) => (
          <ListItem key={i} />
        ))}
    </ul>
  );
}
