export const levels = [
    {
        level: 0x1000,
        value: "Super Admin",
    },
    {
        level: 0x90,
        value: "Admin",
    },
    {
        level: 0x40,
        value: "Manager",
    },
    {
        level: 0x20,
        value: "Supervisor",
    },
    {
        level: 0x01,
        value: "staff",
    },
];

export const roleToLevel = (roles) => {
    return levels
        .filter(({ value }) => {
            return Array.isArray(roles) && roles.indexOf(value) >= 0;
        })
        .reduce((acc, val) => {
            acc += parseInt(val.level);
        }, 0);
};

export const levelToRole = (level) => {
    return levels
        .reduce((acc, val) => {
            if ((val.level & level) > 0) {
                acc.push(val.value);
            }
            return acc;
        }, [])
        .join(", ");
};
