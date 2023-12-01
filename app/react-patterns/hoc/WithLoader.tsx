import { useEffect, useState } from "react";

export default function WithLoader(Element: React.ComponentType, url: string) {
  return (props: any) => {
    const [data, setData] = useState();

    useEffect(() => {
      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      }

      getData();
    }, []);

    if (!data) return <div>Loading...</div>;

    return <Element {...props} data={data} />;
  };
}
