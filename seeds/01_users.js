const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('users').del();

    // Seed new entries
    const hashedPassword = await bcrypt.hash('yourplaintextpassword', 10);

    return knex('users').insert([
        {
            user_id: 1,
            username: 'alissa92',
            email: 'alissa92@icloud.com',
            password_hash: hashedPassword,
            profile_picture_url: ' ',
            phone_number: '3051234567',
            mini_bio: 'Hi. My name is Alissa and I recently moved from Chicago. I love dogs and the ocean.',
            registration_date: new Date(),
        },
        {
            user_id: 2,
            username: 'michael23',
            email: 'michael.smith@yahoo.com',
            password_hash: hashedPassword,
            profile_picture_url: ' ',
            phone_number: '3053334455',
            mini_bio: "I'm Michael, father of two. Looking to find someone that lives and works in same areas that I do, so we split expenses",
            registration_date: new Date(),
        },
        {
            user_id: 3,
            username: 'robbie77',
            email: 'robert_robbie77@gmail.com',
            password_hash: hashedPassword,
            profile_picture_url: ' ',
            phone_number: '3051114567',
            mini_bio: 'Hi. My name is Robert and I recently got a job little far from my house. Looking forward to meeting you',
            registration_date: new Date(),
        },
        {
            user_id: 4,
            username: 'gigyjhoanna',
            email: 'jhoanna_columbia@yahoo.com',
            password_hash: hashedPassword,
            profile_picture_url: ' ',
            phone_number: '7861234567',
            mini_bio: 'I am Jhoanna and I speak Spanish and English. I love icecream',
            registration_date: new Date(),
        },
        {
            user_id: 5,
            username: 'oceanlover',
            email: 'andrew.morgan@icloud.com',
            password_hash: hashedPassword,
            profile_picture_url: ' ',
            phone_number: '9541234567',
            mini_bio: "I am Andrew from South Carolina. I live in South Beach, but my job is in Coconut Grove. Let's pool",
            registration_date: new Date(),
        },
        {
            user_id: 6,
            username: 'tomasss13',
            email: 'tomas.b@hotmail.com',
            password_hash: hashedPassword,
            profile_picture_url: ' ',
            phone_number: '7867867867',
            mini_bio: 'I am Tomas from Argentina, looking to meet new friends and save some money pooling',
            registration_date: new Date(),
        }
    ]);
};
