export const getLanguage=(name, languages)=>{
    const names=name.split(' ');
    let result=[];
    for (let iii = 0; iii < names.length; iii++) {
        const nm = names[iii];
        const p = languages[nm] || `${nm}`;
        result.push(p);
    }
    return result.join(' ');
}

export const languages = [
    {
        name:'Indonesia',
        id:'id',
    },
    {
        name:'English',
        id:'gb',
    },
]