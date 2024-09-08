import { db } from '@vercel/postgres';

const client = await db.connect();

const datas = [
    {
      "term": "ADC",
      "interpretation": "Attack Damage Carry, seorang hero yang memiliki damage fisik tinggi dan berperan untuk memberikan kerusakan besar di akhir permainan."
    },
    {
      "term": "Buff",
      "interpretation": "Efek positif sementara yang meningkatkan statistik atau kemampuan hero, biasanya diperoleh dari monster hutan atau buff yang diberikan oleh hero lain."
    },
    {
      "term": "CC",
      "interpretation": "Crowd Control, kemampuan untuk mengendalikan pergerakan atau tindakan musuh, seperti stun, slow, atau knock-up."
    },
    {
      "term": "Dive",
      "interpretation": "Strategi menyerang hero musuh yang berada di bawah turret atau dalam posisi bertahan, sering kali dengan tujuan membunuh hero musuh."
    },
    {
      "term": "Gank",
      "interpretation": "Serangan tiba-tiba oleh satu atau lebih hero ke arah lane atau area untuk mengalahkan hero musuh yang tidak siap."
    },
    {
      "term": "Jungler",
      "interpretation": "Hero yang berfokus pada membunuh monster hutan untuk mendapatkan gold dan pengalaman, serta melakukan gank ke lane untuk membantu rekan satu tim."
    },
    {
      "term": "Kiting",
      "interpretation": "Teknik menyerang sambil bergerak mundur untuk menghindari serangan musuh, sering digunakan oleh hero jarak jauh untuk menjaga jarak."
    },
    {
      "term": "Meta",
      "interpretation": "Most Effective Tactics Available, mengacu pada strategi, hero, dan item yang dianggap paling efektif dan populer pada periode tertentu."
    },
    {
      "term": "Peel",
      "interpretation": "Aksi melindungi rekan satu tim dari serangan musuh, terutama hero yang rentan seperti ADC atau mage, dengan menggunakan kemampuan crowd control atau zoning."
    },
    {
      "term": "Snowball",
      "interpretation": "Situasi di mana satu tim atau hero mendapatkan keuntungan awal yang signifikan dan terus menekan untuk memperbesar keuntungan tersebut hingga akhir permainan."
    }
  ]

  async function seedData() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS datas (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        term VARCHAR(255) NOT NULL UNIQUE,
        interpretation TEXT NOT NULL
      );
    `;
  
    const insertedDatas = await Promise.all(
      datas.map(async (data) => {
        return client.sql`
          INSERT INTO datas (term, interpretation)
          VALUES (${data.term}, ${data.interpretation})
          ON CONFLICT (term) DO NOTHING;
        `;
      }),
    );
  
    return insertedDatas;
  }


export async function GET(){
    try {
        await client.sql`BEGIN`;
        await seedData();
        await client.sql`COMMIT`;
        return Response.json({massage:'Database Seed Successfully!'})
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}