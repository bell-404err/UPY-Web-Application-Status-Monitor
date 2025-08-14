type MonitorTask = {
    userId: string;
    url: string[];
    interval: number;
};

// Считаем текущее время для примера
const now = Math.floor(Date.now() / 1000);

const monitorTasks: MonitorTask[] = [
    {
        userId: "user1",
        url: ["https://google.com"],
        interval: 60,
    },
    {
        userId: "user2",
        url: ["https://openai.com"],
        interval: 120,
    },
    {
        userId: "user3",
        url: ["https://stackoverflow.com"],
        interval: 90,
    },
    {
        userId: "user4",
        url: ["https://npmjs.com"],
        interval: 180,
    },
    {
        userId: "user5",
        url: ["https://nodejs.org"],
        interval: 75,
    },
    {
        userId: "user6",
        url: ["https://wikipedia.org"],
        interval: 150,
    },
    {
        userId: "user7",
        url: ["https://reddit.com"],
        interval: 240,
    },
    {
        userId: "user8",
        url: ["https://yandex.com"],
        interval: 200,
    },
    {
        userId: "user9",
        url: ["https://aws.amazon.com"],
        interval: 300,
    },
    {
        userId: "user10",
        url: ["https://medium.com"],
        interval: 100,
    }
];

export default monitorTasks;