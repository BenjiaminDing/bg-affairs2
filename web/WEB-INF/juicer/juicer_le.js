

let me ={

}

let json = {
    links: [
        {href: 'http://juicer.name', alt: 'Juicer'},
        {href: 'http://benben.cc', alt: 'Benben'},
        {href: 'http://ued.taobao.com', alt: 'Taobao UED'}
    ]
};

let tpl = [
    '{@each links as item}',
    '${item|links_build} <br />',
    '{@/each}'
].join('');

let links = function(data) {
    return '<a href="' + data.href + '" alt="' + data.alt + '" />';
};


juicer.register('links_build', links); //注册自定义函数 juicer(tpl, json);
