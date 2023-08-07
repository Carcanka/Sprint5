--@block 
-- Creación de tablas.
CREATE TABLE IF NOT EXISTS usuario(
    id serial PRIMARY KEY,
    email varchar unique,
    activo boolean
);

CREATE TABLE IF NOT EXISTS prioridad(
    id serial,
    nombre varchar,
    descripcion varchar
);

CREATE TABLE IF NOT EXISTS tarea(
    id serial,
    prioridad_id int,
    usuario_id int,
    titulo varchar,
    completado boolean
);

--@block 
--Alteraciones en la tabla
--Para ajustar las tablas a las necesidades de las Querys
ALTER TABLE prioridad 
ADD PRIMARY KEY(id);
ALTER TABLE tarea 
ADD PRIMARY KEY(id);

ALTER TABLE tarea 
ADD FOREIGN KEY (usuario_id) references usuario(id);
ALTER TABLE tarea 
ADD FOREIGN KEY (prioridad_id) references prioridad(id);

--@block
--Insertar prioridades, alta, media, baja
INSERT INTO prioridad 
    (nombre, descripcion)
VALUES
('alta', 'Alta prioridad'),
('media', 'Media prioridad'),
('baja', 'Baja prioridad');

--Insertar usuarios
INSERT INTO usuario
    (email, activo)
VALUES
('Alumno1@gmail.com', true),
('Alumno2@gmail.com', false),
('Alumno3@gmail.com', true),
('Alumno4@gmail.com', false);

--Insertar tareas
INSERT INTO tarea
(titulo, prioridad_id, usuario_id, completado)
VALUES
('Tomar Agua', 1, 1, true),
('Tomar Agua', 1, 2, true),
('Tomar Agua', 1, 3, true),
('Terminar el bootcamp', 2, 2, false),
('Terminar el bootcamp', 2, 3, true),
('Terminar el bootcamp', 2, 4, false),
('Cocinar', 1, 3, false),
('Hacer el resumen de React.js', 3, 4, false);



--@block
--Obtener todas las tareas
Select * 
FROM tarea;
--Obtener todas las tareas por usuario
SELECT titulo, usuario_id
FROM tarea
GROUP BY titulo, usuario_id;
--Obtener todas las tareas que sean de un usuario y estén pendiente
SELECT titulo, usuario_id, completado
FROM tarea
WHERE completado = FALSE
ORDER BY usuario_id;




--@block
--Borrar una tarea
Delete
FROM tarea
WHERE id = 10;




--@block
--Insertar un email repetido, ¿qué pasa?, ¿por qué?
INSERT INTO usuario
(email, activo)
VALUES
('Alumno1@gmail.com', false);
--Devuelve el mensaje "llave duplicada viola restricción de unicidad «usuario_email_key»" debido a que le dimos el valor Unique=Único al email



--@block
--Intentar eliminar una prioridad que está siendo referenciada en una tarea, ¿es posible?, ¿por qué?, ¿qué significa la eliminación en cascada?
Delete
FROM prioridad
WHERE id = 1;
--Devuelve el mensaje "update o delete en «prioridad» viola la llave foránea «tarea_prioridad_id_fkey» en la tabla «tarea»"  por lo tanto no se puede eliminar ni modificar. La eliminación en cascada es una opción que permite al borrar un dato, eliminar su referencia para permitir eliminaciones incluso con claves foraneas referenciadas. Su uso es peligroso por la posibilidad de eliminar datos que necesitamos para otras tablas.



--@block
--Actualizar la tarea con el id más reciente de un usuario
UPDATE tarea
set completado = true
where id = (select max(id)
FROM tarea
WHERE usuario_id = 2);
--Generamos una Sub-Query para poder modificar la ultima tarea del usuario_id 2

SELECT *
FROM tarea
WHERE usuario_id = 2;
