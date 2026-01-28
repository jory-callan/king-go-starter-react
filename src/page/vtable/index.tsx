import { ListTable } from "@visactor/react-vtable";

export default function TestDemo() {
  const option = {
    columns: [
      {
        field: "0",
        title: "name",
      },
      {
        field: "1",
        title: "age",
      },
      {
        field: "2",
        title: "gender",
      },
      {
        field: "3",
        title: "hobby",
      },
    ],
    records: new Array(1000).fill(["John", 18, "male", "🏀"]),
  };
  return (
    <div>
      <ListTable option={option} height={"500px"} />
    </div>
  )
}
