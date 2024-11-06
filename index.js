const express = require('express');
const app = express();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

app.post('/', async (req, res) => {
    const {name, email} = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email
        }
    });
    res.json(user);
});

app.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.get('/:id', async (req, res) => {
    const {id} = req.params;
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    res.json(user);
});

app.patch('/:id', async (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;
    const user = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            email
        }
    });
    res.json(user);
});

app.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const user = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(user);
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
    }
);