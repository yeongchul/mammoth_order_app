import { OrderLog } from "../../types/common";
import dayjs from "dayjs";

export default function Alarmlog() {
  const orderlog: OrderLog[] = [
    {
      beverage: "아메리카노",
      price: 1600,
      point: 1600 * 0.03,
      orderdate: new Date("2025-04-29T09:30:00"),
    },
    {
      beverage: "카페 라떼",
      price: 2700,
      point: 2700 * 0.03,
      orderdate: new Date("2025-04-26T08:37:00"),
    },
    {
      beverage: "카페 모카",
      price: 3300,
      point: 3300 * 0.03,
      orderdate: new Date("2025-04-25T15:30:00"),
    },
    {
      beverage: "아메리카노",
      price: 1600,
      point: 1600 * 0.03,
      orderdate: new Date("2025-04-25T10:19:00"),
    },
    {
      beverage: "아샷추 복숭아 아이스티",
      price: 3400,
      point: 3400 * 0.03,
      orderdate: new Date("2025-04-24T10:01:00"),
    },
    {
      beverage: "아메리카노",
      price: 1600,
      point: 1600 * 0.03,
      orderdate: new Date("2025-04-20T09:00:00"),
    },
    {
      beverage: "아인슈페너 라떼",
      price: 3500,
      point: 3500 * 0.03,
      orderdate: new Date("2025-04-15T13:20:00"),
    },
    {
      beverage: "아샷추 복숭아 아이스티",
      price: 3400,
      point: 3400 * 0.03,
      orderdate: new Date("2025-04-12T10:11:00"),
    },
    {
      beverage: "아샷추 복숭아 아이스티",
      price: 3400,
      point: 3400 * 0.03,
      orderdate: new Date("2025-04-08T09:41:00"),
    },
    {
      beverage: "바닐라 라떼",
      price: 3100,
      point: 3100 * 0.03,
      orderdate: new Date("2025-04-07T12:37:00"),
    },
  ];
  function formatDate(date: Date) {
    return dayjs(date).format("YYYY년MM월DD일 HH시mm분");
  }
  function formatDatePlus30(date: Date) {
    return dayjs(date).add(30, "minute").format("YYYY년MM월DD일 HH시mm분");
  }
  return (
    <div className="mt-5">
      <ul>
        {orderlog.map((logs, index) => (
          <>
            <li key={index} className="p-2 pb-3 border-b-2 border-gray-100">
              <p className="text-sm mb-1">[픽업완료] {logs.beverage} 1개</p>
              <div className="flex text-xs flex-row text-gray-500">
                <p className="font-bold mr-2 text-black">주문</p>{" "}
                {formatDatePlus30(logs.orderdate)}
              </div>
            </li>
            <li className="p-2 pb-3 border-b-2 border-gray-100">
              <p className="text-sm mb-1">
                포인트 {logs.point}점이 적립되었습니다.
              </p>
              <div className="flex text-xs flex-row text-gray-500">
                <p className="font-bold mr-2 text-black">포인트</p>{" "}
                {formatDate(logs.orderdate)}
              </div>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}
