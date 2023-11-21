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
            full_name: 'Alissa Smith',
            phone_number: '3051234567',
            mini_bio: 'Hi. My name is Alissa and I recently moved from Chicago. I love dogs and the ocean.',
            registration_date: new Date(),
        },
        {
            user_id: 2,
            username: 'michael23',
            email: 'michael.smith@yahoo.com',
            password_hash: hashedPassword,
            full_name: 'Michael Smith',
            phone_number: '3053334455',
            mini_bio: "I'm Michael, father of two. Looking to find someone that lives and works in the same areas that I do, so we split expenses",
            registration_date: new Date(),
        },
        {
            user_id: 3,
            username: 'robbie77',
            email: 'robert_robbie77@gmail.com',
            password_hash: hashedPassword,
            full_name: 'Robert Johnson',
            phone_number: '3051114567',
            mini_bio: 'Hi. My name is Robert and I recently got a job a little far from my house. Looking forward to meeting you',
            registration_date: new Date(),
        },
        {
            user_id: 4,
            username: 'gigyjhoanna',
            email: 'jhoanna_columbia@yahoo.com',
            password_hash: hashedPassword,
            full_name: 'Jhoanna Garcia',
            phone_number: '7861234567',
            mini_bio: 'I am Jhoanna and I speak Spanish and English. I love ice cream',
            registration_date: new Date(),
        },
        {
            user_id: 5,
            username: 'oceanlover',
            email: 'andrew.morgan@icloud.com',
            password_hash: hashedPassword,
            full_name: 'Andrew Morgan',
            phone_number: '9541234567',
            mini_bio: "I am Andrew from South Carolina. I live in South Beach, but my job is in Coconut Grove. Let's pool",
            registration_date: new Date(),
        },
        {
            user_id: 6,
            username: 'tomasss13',
            email: 'tomas.b@hotmail.com',
            password_hash: hashedPassword,
            full_name: 'Tomas Hernandez',
            phone_number: '7867867867',
            mini_bio: 'I am Tomas from Argentina, looking to meet new friends and save some money pooling',
            registration_date: new Date(),
        },
        {
            user_id: 7,
            username: 'laurasmith',
            email: 'laura.smith@gmail.com',
            password_hash: hashedPassword,
            full_name: 'Laura Smith',
            phone_number: '3059876543',
            mini_bio: 'Hello, I am Laura. I enjoy hiking and reading. Looking for someone with similar interests.',
            registration_date: new Date(),
        },
        {
            user_id: 8,
            username: 'johndoe',
            email: 'john.doe@hotmail.com',
            password_hash: hashedPassword,
            full_name: 'John Doe',
            phone_number: '7868765432',
            mini_bio: 'Hi there, I am John. I love coding and playing guitar. Let\'s connect!',
            registration_date: new Date(),
        },
        {
            user_id: 9,
            username: 'emilyrose',
            email: 'emily.rose@yahoo.com',
            password_hash: hashedPassword,
            full_name: 'Emily Rose',
            phone_number: '9545678901',
            mini_bio: 'Hey, I am Emily. I am a coffee enthusiast and enjoy painting in my free time.',
            registration_date: new Date(),
        },
        {
            user_id: 10,
            username: 'davidgreen',
            email: 'david.green@gmail.com',
            password_hash: hashedPassword,
            full_name: 'David Green',
            phone_number: '3056789012',
            mini_bio: 'Hello, I am David. I am passionate about technology and always up for a good sci-fi movie.',
            registration_date: new Date(),
        },
    ]);
};
