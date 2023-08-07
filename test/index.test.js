const request = require("supertest");
const app = require("../index");
const listaDeTareas = require("../controllers/tareas")

describe("testear tareas", () => {
  test("debe traer la tarea del Id 1", async () => {
    const response = await request(app).get("/api/tareas/obtenerTareasPorUsuario/1");
    
    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual({
        id: 1,
        prioridad_id: 1,
        usuario_id: 1,
        titulo: "comer vegetales",
        completado: true
    });
  });
});

describe("testear status", () => {
  test("status debe ser entre 200 y 300", async () => {
    const response = await request(app).get("/api/tareas");
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
    });
});

describe("testear status", () => {
  test("completado verdadero Nro 1", async () => {
    const response = await request(app).get("/api/tareas/1");
    expect(response.body[0].completado).toBeTruthy();
    });
});

describe("testear status", () => {
  test("completado falso Nro 3", async () => {
    const response = await request(app).get("/api/tareas/3");
    expect(response.body[0].completado).toBeFalsy();
    });
});

// describe("testear status", () => {
//   test("busqueda de tarea indefinida", async () => {
//     const response = await request(app).get("/api/tareas/3");
//     expect(response.body[0].equipoDeFutbol).toBeUndefined();
//     });
// });

// describe("testear status", () => {
//   test("", async () => {
//     const response = await request(app).get("/api/tareas/1");
//     expect(response.body.tareas[0].titulo).toContain("agua");
//     });
// });

// describe("testear status", () => {
//   test("", async () => {
//     const response = await request(app).get("/api/tareas");
//     expect(response.body.tareas).toHaveLength(4);
//     });
// });

// describe("testear status", () => {
//   test("", async () => {
//     const response = await request(app).get("/api/tareas/5");
//     expect(response.body.tareas[0].titulo).toHaveLength(28);
//     });
// });

// //BONUS

// describe("testear status", () => {
//   test("", async () => {
//     const response = await request(app).get("/api/tareas/5");
//     expect(response.body.tareas[0].titulo).toMatch(/agua/);
//     });
// });