const getTimers = () => {
  const timers = localStorage.getItem("timers");
  if (timers) {
    return JSON.parse(timers);
  }
  return [];
};

const getRandomColor = () => {
  const colors = [
    "bg-purple-600",
    "bg-blue-600",
    "bg-teal-600",
    "bg-amber-600",
    "bg-rose-600",
    "bg-indigo-600",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

interface Timer {
    id: string;
    name: string;
    createdAt: string;
    elapsedTime: number;
    isRunning: boolean;
    color: string;
}

export const createTimer = (
    newTimerName: string,
): void => {
    const times: Timer[] = getTimers();

    const newTimes: Timer[] = [
        ...times,
        {
            id: Date.now().toString(),
            name: newTimerName.trim(),
            createdAt: new Date().toISOString(),
            elapsedTime: 0,
            isRunning: false,
            color: getRandomColor(),
        },
    ];

    localStorage.setItem("timers", JSON.stringify(newTimes));
};


export const startTimer = (id: string): void => {
    const timers: Timer[] = getTimers();

    const updatedTimers: Timer[] = timers.map((timer) => {
        if (timer.id === id) {
            return { ...timer, isRunning: true };
        }
        return timer;
    });

    localStorage.setItem("timers", JSON.stringify(updatedTimers));
}


export const pauseTimer = (id: string): void => {
    const timers: Timer[] = getTimers();

    const updatedTimers: Timer[] = timers.map((timer) => {
        if (timer.id === id) {
            return { ...timer, isRunning: false };
        }
        return timer;
    });

    localStorage.setItem("timers", JSON.stringify(updatedTimers));
};


export const resetTimer = (id: string): void => {
    const timers: Timer[] = getTimers();

    const updatedTimers: Timer[] = timers.map((timer) => {
        if (timer.id === id) {
            return { ...timer, elapsedTime: 0, isRunning: false };
        }
        return timer;
    });

    localStorage.setItem("timers", JSON.stringify(updatedTimers));
};



export const deleteTimer = (id: string): void => {
    const timers: Timer[] = getTimers();

    const updatedTimers: Timer[] = timers.filter((timer) => timer.id !== id);

    localStorage.setItem("timers", JSON.stringify(updatedTimers));
};




const manageTime = {
    getTimers,
    createTimer,
    startTimer,
    pauseTimer,
    resetTimer, 
    deleteTimer,
};

export default manageTime