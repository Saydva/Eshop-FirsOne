import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let refreshToken: string;
  let validUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it.skip('/auth/regiter wrong credentials (POST)', async () => {
    const registerDto = {
      name: 'Test User',
      email: 'invalid-email',
      password: 'short',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto)
      .expect(400);
    expect(response.body.message).toContain('email must be an email');
    expect(response.body.message).toContain(
      'password must be longer than or equal to 6 characters',
    );
  });

  it.skip('/auth/register (POST)', async () => {
    const registerDto = {
      name: 'Test User',
      email: 'test@gmail.com',
      password: 'Test1234',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto);

    expect([201, 409]).toContain(response.status);
    if (response.status === 201) {
      expect(response.body).toEqual(
        expect.objectContaining({
          name: registerDto.name,
          email: registerDto.email,
        }),
      );
    } else if (response.status === 409) {
      expect(response.body).toEqual(
        expect.objectContaining({
          message: 'User already exists',
        }),
      );
    }
  });

  it('/auth/login (POST)', async () => {
    const loginDto = {
      email: 'test@gmail.com',
      password: 'Test1234',
    };
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(201);
    accessToken = response.body.user.accessToken;
    refreshToken = response.body.user.refreshToken;
    validUserId = response.body.user.id;

    expect(response.body.user).toHaveProperty('accessToken');
    expect(response.body.user).toHaveProperty('refreshToken');
    expect(response.body.user.accessToken).toBeDefined();
    expect(response.body.user.refreshToken).toBeDefined();
  });

  it.skip('/auth/login invalid data (POST)', async () => {
    const loginDto = {
      email: 'notfound@gmail.com', // validný email
      password: 'SomeValidPassword', // validné heslo
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(409);
    expect(response.body.message).toBe('Invalid credentials');
    console.log(response.body);
  });

  it('/auth/user/:id (GET)', async () => {
    const userId = validUserId;
    const response = await request(app.getHttpServer())
      .get(`/auth/user/${userId}`)
      .expect(401);
    expect(response.body.message).toBe('Unauthorized');
  });

  it('/auth/user/:id (GET)', async () => {
    const userId = validUserId;
    const response = await request(app.getHttpServer())
      .get(`/auth/user/${userId}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200);
    expect(response.body).toHaveProperty('_id', userId);
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('name');
  });

  it('/auth/refresh (POST)', async () => {
    const refresh = refreshToken;
    const response = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: refresh })
      .expect(201);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body.accessToken).toBeDefined();
    expect(response.body).toHaveProperty('refreshToken');
    expect(response.body.refreshToken).toBeDefined();
  });

  it('/auth/refresh inavlid token (POST)', async () => {
    const refresh = 'invalidToken';
    const response = await request(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken: refresh })
      .expect(409);
    expect(response.body.message).toBe('Invalid refresh token');
  });

  it('/auth/logout/:id (POST)', async () => {
    const userId = validUserId; // Replace with a valid user ID
    const response = await request(app.getHttpServer())
      .post(`/auth/logout/${userId}`)
      .expect(200);
    expect(response.body.message).toBe('Logged out successfully');
  });
});
