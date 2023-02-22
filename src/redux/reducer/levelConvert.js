export const levels = [
    {
        level:0x1000,
        value:'Super Admin'
    },
    {
        level:0x10,
        value:'Admin'
    },
    {
        level:0x04,
        value:'Head Office'
    },
    {
        level:0x08,
        value:'Kanwil'
    },
    {
        level:0x02,
        value:'Kanim'
    },
    {
        level:0x01,
        value:'TPI'
    },
];

export const roleToLevel=(roles)=>{
    return levels.filter(({value})=>{
        return Array.isArray(roles) && roles.indexOf(value)>=0;
    }).reduce((acc, val)=>{
        acc+=parseInt(val.level);
    }, 0)
}

export const levelToRole=(level)=>{
    return levels.reduce((acc, val)=>{
        if((val.level & level)>0){
            acc.push(val.value);
        }
        return acc;
    }, []).join(', ');
}