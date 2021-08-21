// Ticket {
//     id // идентификатор (уникальный в пределах системы)
//     name // краткое описание
//     status // boolean - сделано или нет
//     created // дата создания (timestamp)
// }

// TicketFull {
//     id // идентификатор (уникальный в пределах системы)
//     name // краткое описание
//     description // полное описание
//     status // boolean - сделано или нет
//     created // дата создания (timestamp)
// }

// GET ?method=allTickets - список тикетов
// GET ?method=ticketById&id=<id> - полное описание тикета (где <id> - идентификатор тикета)
// POST ?method=createTicket - создание тикета (<id> генерируется на сервере, в теле формы name, description, status)
// Соответственно:

// GET ?method=allTickets - массив объектов типа Ticket (т.е. без description)
// GET ?method=ticketById&id=<id> - объект типа TicketFull (т.е. с description)
// POST ?method=createTicket - в теле запроса форма с полями для объекта типа Ticket (с id = null)

const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');

const app = new Koa();

app.use(cors());
app.use(koaBody({json: true}));


const tickets = [
    {
        id: 1,
        name: 'Поменять краску в принтере, ком.404',
        description: 'Принтер HP LJ 1210, картридж на складе',
        status: false,
        created: new Date('2019-03-10, 08:40') 
    },
    {
        id: 2,
        name: 'Переустановить Windows, ПК-Hall24',
        description: 'Windows 10 HE, установочный диск в серверной',
        status: false,
        created: new Date('2019-03-15, 12:35') 
    },
    {
        id: 3,
        name: 'Установить обновление КВ-ХХХ',
        description: 'Никто точно не знает, что такое КВ-ХХХ, поэтому просто с важным видом потыкать по клавиатуре и сказать, что готово',
        status: false,
        created: new Date('2019-03-15, 12:40') 
    } 

];

app.use(async ctx => {
    const { method } = ctx.request.querystring;

    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
            return;
        // TODO: обработка остальных методов
        default:
            ctx.response.status = 404;
            return;
    }
});


app.use(async (ctx) => {
    console.log('request.querystring:', ctx.request.querystring);
    console.log('request.body', ctx.request.body);
    ctx.response.status = 204;
  
    console.log(ctx.response);
  });
  
  const port = process.env.PORT || 7070;
  const server = http.createServer(app.callback()).listen(port, () => console.log(`server is listening on port ${port}`));

