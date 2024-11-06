const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const { skip } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();

app.use(express.json());

app.post("/user", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  //   console.log(firstName, lastName);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email
    },
  });
  res.json(user);
});

app.get("/user", async (req, res) => {
  const users = await prisma.user.findMany({
    where: {
        email: {
            contains: "a@gmail.com", // CONTAINS
            startsWith: "a", // STARTS WITH
            endsWith: "a", // ENDS WITH
            in: [" ", " ", " "], // IN
            notIn: [" ", " ", " "], // NOT IN
            lt: 10, // LESS THAN
            lte: 10, // LESS THAN OR EQUAL
            gt: 10, // GREATER THAN
            gte: 10, // GREATER THAN OR EQUAL
            not: " ", // NOT EQUAL
            equals: " ", // EQUAL
        },
    }
  });
  res.json(users);
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
});

app.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
     firstName,
     lastName
    },
  });
  res.json(user);
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
});

// post 
app.post("/post", async (req, res) => {
    const { title, data, authorId } = req.body;
    const post = await prisma.post.create({
        data: {
        title,
        data,
        authorId: parseInt(authorId),
        },
    });
    res.json(post);
    });

    //post many post (array of post)
app.post("/post/many", async (req, res) => {
    const createdPosts = await prisma.post.createMany({
        data: req.body,
    });
    res.json(createdPosts);
    });

// get all post
app.get("/post", async (req, res) => {
    const posts = await prisma.post.findMany({

        // the following code is for filtering, sorting, pagination, and including related data (basecally filtering)
        
        // include: {
        //     //use select to get only the required fields of author
        //     author: {
        //         select: {
        //             firstName: true,
        //             lastName: true,
        //         },
        //     },
        // },
        // where: {
        //     authorId: 2,
        // },
        // take: 3,
        // skip: 6,
        // orderBy: {
        //     createdAt: "desc",
        // },

        // now will go to advanced filtering in  the user

        
    });
    res.json(posts);
    });

// get post by id
app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
        where: {
        id,
        },
    });
    res.json(post);
    });

// update post
app.patch("/post/:id", async (req, res) => {
    const { id } = req.params;
    const { title, data } = req.body;
    const post = await prisma.post.update({
        where: {
        id,
        },
        data: {
        title,
        data,
        },
    });
    res.json(post);
    });

// delete post
app.delete("/post/:id", async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.delete({
        where: {
        id,
        },
    });
    res.json(post);
    });




app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
