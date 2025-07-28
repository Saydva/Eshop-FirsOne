import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';

describe.skip('ProductController (e2e)', () => {
  // --- Sekcia: CRUD operácie so správnymi dátami ---
  let app: INestApplication;
  let createdProductId: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Test: Získanie všetkých produktov (očakáva pole)
  it('/product (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/product')
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test: Vytvorenie produktu so správnymi dátami
  it('/product (POST)', async () => {
    const dto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      categoryId: 1,
      stockQuantity: 10,
    };
    const response = await request(app.getHttpServer())
      .post('/product')
      .send(dto);
    createdProductId = response.body._id;
    expect(response.body).toEqual(
      expect.objectContaining({
        ...dto,
        categoryId: String(dto.categoryId),
      }),
    );
  });

  // Test: Získanie produktu podľa ID
  it('/product/:id (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get(`/product/${createdProductId}`)
      .expect(200);
    expect(response.body).toHaveProperty('_id', createdProductId);
  });

  // Test: Úprava produktu podľa ID
  it('/product/:id (PUT)', async () => {
    const dto = {
      name: 'Updated Product',
      description: 'Updated Description',
      price: 150,
      categoryId: 6,
      stockQuantity: 20,
    };
    const response = await request(app.getHttpServer())
      .patch(`/product/${createdProductId}`)
      .send(dto)
      .expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        ...dto,
        categoryId: String(dto.categoryId),
      }),
    );
  });

  // Test: Zmazanie produktu podľa ID
  it('/product/:id (DELETE)', async () => {
    const productId = createdProductId; // Replace with a valid product ID
    await request(app.getHttpServer())
      .delete(`/product/${productId}`)
      .expect(200);
  });

  // --- Sekcia: Chybové stavy a validácia ---
  // Test: Zmazanie neexistujúceho produktu (očakáva 404)
  it('/product/:id (DELETE) - not found', async () => {
    const notExistingId = '000000000000000000000000';
    await request(app.getHttpServer())
      .delete(`/product/${notExistingId}`)
      .expect(404);
  });

  // Test: Získanie neexistujúceho produktu (očakáva 404)
  it('/product/:id (GET) - not found', async () => {
    const notExistingId = '000000000000000000000000';
    await request(app.getHttpServer())
      .get(`/product/${notExistingId}`)
      .expect(404);
  });

  // Test: Vytvorenie produktu s nevalidnými dátami (očakáva 400)
  it('/product (POST) - validation error', async () => {
    const invalidDto = {
      name: '',
      description: 'Test Description',
      price: 100,
      categoryId: '1',
      stockQuantity: 10,
    };
    await request(app.getHttpServer())
      .post('/product')
      .send(invalidDto)
      .expect(400);
  });

  // Test: Získanie produktu s nevalidným ID (očakáva 400)
  it('/product/:id (GET) - invalid ID', async () => {
    const invalidId = 'invalid-id';
    await request(app.getHttpServer()).get(`/product/${invalidId}`).expect(400);
  });

  // --- Sekcia: Upratovanie po testoch ---
  afterAll(async () => {
    await app.close();
  });
});

describe('ProductController (e2e)', () => {
  // --- Sekcia: CRUD operácie so správnymi dátami ---
  let app: INestApplication;
  let createdProductId: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Test: Vytvorenie produktu so správnymi dátami
  it('/product (POST)', async () => {
    const dto = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      categoryId: '1',
      stockQuantity: 10,
    };
    const response = await request(app.getHttpServer())
      .post('/product')
      .send(dto);
    createdProductId = response.body._id;
    expect(response.body).toEqual(
      expect.objectContaining({
        ...dto,
        categoryId: String(dto.categoryId),
      }),
    );
  });

  // Test: Aktualizácia produktu s nevalidnými dátami (očakáva 400)
  it('/product/:id (PATCH) - validation error', async () => {
    const invalidDto = {
      price: 'abc',
    };
    await request(app.getHttpServer())
      .patch(`/product/${createdProductId}`)
      .send(invalidDto)
      .expect(400);
  });

  // PATCH s neexistujúcim ID a validnými dátami (očakáva 404)
  it('/product/:id (PATCH) - not found', async () => {
    const notExistingId = '000000000000000000000000';
    const validDto = {
      name: 'Valid Name',
      description: 'Updated Description',
      price: 150,
      categoryId: '6',
      stockQuantity: 20,
    };
    await request(app.getHttpServer())
      .patch(`/product/${notExistingId}`)
      .send(validDto)
      .expect(404);
  });

  // PATCH s neexistujúcim ID a nevalidnými dátami (očakáva 400)
  it('/product/:id (PATCH) - not found and validation error', async () => {
    const notExistingId = '000000000000000000000000';
    const invalidDto = {
      name: '',
      description: 'Updated Description',
      price: 150,
      categoryId: '6',
      stockQuantity: 20,
    };
    await request(app.getHttpServer())
      .patch(`/product/${notExistingId}`)
      .send(invalidDto)
      .expect(400);
  });

  //DELETE s neplatným ObjectId (očakávaj 400)
  it('/product/:id (DELETE) - invalid ID', async () => {
    const invalidId = 'invalid-id';
    await request(app.getHttpServer())
      .delete(`/product/${invalidId}`)
      .expect(400);
  });

  //POST s nadbytočnými poliami (očakávaj 400 vďaka ValidationPipe)
  it('/product (POST) - extra fields', async () => {
    const dto = {
      name: 'Extra Fields Product',
      description: 'This product has extra fields',
      price: 200,
      categoryId: 2,
      stockQuantity: 5,
      extraField: 'This should not be here',
    };
    await request(app.getHttpServer()).post('/product').send(dto).expect(400);
  });

  //DELETE s neplatným ObjectId (očakávaj 400)
  it('/product/:id (DELETE) - invalid ID', async () => {
    const invalidId = 'invalid-id';
    await request(app.getHttpServer())
      .delete(`/product/${invalidId}`)
      .expect(400);
  });

  // --- Sekcia: Upratovanie po testoch ---
  afterAll(async () => {
    await app.close();
  });
});
