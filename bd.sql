-- Adminer 5.3.0 PostgreSQL 18.3 dump

DROP TABLE IF EXISTS "aputes_tarea";
DROP SEQUENCE IF EXISTS aputes_tarea_id_apu_tarea_seq;
CREATE SEQUENCE aputes_tarea_id_apu_tarea_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."aputes_tarea" (
    "id_apu_tarea" integer DEFAULT nextval('aputes_tarea_id_apu_tarea_seq') NOT NULL,
    "apunte" integer NOT NULL,
    "id_tarea" bigint NOT NULL,
    "id_usu" bigint NOT NULL,
    CONSTRAINT "aputes_tarea_pkey" PRIMARY KEY ("id_apu_tarea")
)
WITH (oids = false);

COMMENT ON TABLE "public"."aputes_tarea" IS 'Apuntes y comentarios para la tarea';


DROP TABLE IF EXISTS "proyectos";
DROP SEQUENCE IF EXISTS proyectos_id_pyt_seq;
CREATE SEQUENCE proyectos_id_pyt_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."proyectos" (
    "id_pyt" bigint DEFAULT nextval('proyectos_id_pyt_seq') NOT NULL,
    "pyt_nom" character varying(100) NOT NULL,
    "pyt_desc" character varying(500) NOT NULL,
    "pyt_fec_ini" timestamptz NOT NULL,
    "pyt_fec_fin" timestamptz NOT NULL,
    "pyt_fec_registro" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "proyectos_pkey" PRIMARY KEY ("id_pyt")
)
WITH (oids = false);

COMMENT ON TABLE "public"."proyectos" IS 'Tabla de proyectos';

INSERT INTO "proyectos" ("id_pyt", "pyt_nom", "pyt_desc", "pyt_fec_ini", "pyt_fec_fin", "pyt_fec_registro") VALUES
(1,	'Bot Eps',	'Bot Whatsapp para servicio al cliente EPS usando agente IA.',	'2026-05-12 19:00:00-05',	'2026-05-12 14:00:00-05',	'2026-05-12 14:00:00-05'),
(2,	'Agente ingeniero requerimientos',	'Chat para recolección de requerimientos',	'2026-05-13 20:14:00-05',	'2026-06-13 22:00:00-05',	'2026-05-13 20:15:21.732982-05'),
(3,	'Proyecto G',	'Es el proyecto secreto para G',	'2026-05-16 00:23:00-05',	'2026-05-17 00:24:00-05',	'2026-05-15 00:34:38.860123-05'),
(4,	'Proyecto Zafiro',	'Egresamiento del proyecto Zafiro para granja de controladores para, tu ya sabes',	'2026-05-16 00:23:00-05',	'2026-05-17 00:24:00-05',	'2026-05-15 00:36:20.631768-05');

DROP TABLE IF EXISTS "tareas";
DROP SEQUENCE IF EXISTS tareas_id_tarea_seq;
CREATE SEQUENCE tareas_id_tarea_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."tareas" (
    "id_tarea" bigint DEFAULT nextval('tareas_id_tarea_seq') NOT NULL,
    "id_pyt" integer NOT NULL,
    "ta_nom" character varying(100) NOT NULL,
    "ta_desc" character varying(500) NOT NULL,
    "prioridad" smallint NOT NULL,
    "estado" smallint NOT NULL,
    "tar_fec_ini" timestamptz NOT NULL,
    "tar_fec_fin" timestamptz NOT NULL,
    "tar_fec_registro" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "tareas_pkey" PRIMARY KEY ("id_tarea")
)
WITH (oids = false);

COMMENT ON TABLE "public"."tareas" IS 'Tabla de tareas para los proyectos';

INSERT INTO "tareas" ("id_tarea", "id_pyt", "ta_nom", "ta_desc", "prioridad", "estado", "tar_fec_ini", "tar_fec_fin", "tar_fec_registro") VALUES
(5,	2,	'Sprint 2',	'Cumbre de flujos devastadores y rápidos',	2,	0,	'2026-05-16 08:00:00-05',	'2026-05-16 15:00:00-05',	'2026-05-14 22:34:48.867307-05'),
(3,	1,	'Tarea 3',	'Instalar SMI en una cuando whatsapp en facebbok',	3,	1,	'2026-05-15 09:00:00-05',	'2026-05-18 08:00:00-05',	'2026-05-14 22:32:54.843416-05'),
(2,	1,	'Tarea 2',	'Comprar una SIM en la tienda',	2,	0,	'2026-05-15 08:00:00-05',	'2026-05-15 09:00:00-05',	'2026-05-14 22:32:06.62426-05'),
(4,	2,	'Sprint 1',	'Comprar en la tienda más cercana una SIM',	1,	1,	'2026-05-15 09:00:00-05',	'2026-05-16 08:00:00-05',	'2026-05-14 22:33:50.642251-05'),
(1,	1,	'Tarea 1',	'Implementar numero en cuenta de whatsapp',	1,	1,	'2026-05-13 00:00:00-05',	'2026-05-14 20:00:00-05',	'2026-05-13 22:50:11.613529-05'),
(6,	4,	'Crear el login Zafiro',	'Creación de loguin con huella Zafira',	2,	1,	'2026-05-15 00:41:00-05',	'2026-05-18 00:41:00-05',	'2026-05-15 00:41:44.619915-05');

DROP TABLE IF EXISTS "usuario_proyecto";
DROP SEQUENCE IF EXISTS usuario_proyecto_id_usu_pyt_seq;
CREATE SEQUENCE usuario_proyecto_id_usu_pyt_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."usuario_proyecto" (
    "id_usu_pyt" bigint DEFAULT nextval('usuario_proyecto_id_usu_pyt_seq') NOT NULL,
    "id_usu" bigint NOT NULL,
    "id_pyt" bigint NOT NULL,
    CONSTRAINT "usuario_proyecto_pkey" PRIMARY KEY ("id_usu_pyt")
)
WITH (oids = false);

COMMENT ON TABLE "public"."usuario_proyecto" IS 'Usuario asignado a un proyecto';


DROP TABLE IF EXISTS "usuario_tareas";
DROP SEQUENCE IF EXISTS usuario_tareas_id_usu_tar_seq;
CREATE SEQUENCE usuario_tareas_id_usu_tar_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."usuario_tareas" (
    "id_usu_tar" bigint DEFAULT nextval('usuario_tareas_id_usu_tar_seq') NOT NULL,
    "id_tarea" bigint NOT NULL,
    "id_usu" bigint NOT NULL,
    CONSTRAINT "usuario_tareas_pkey" PRIMARY KEY ("id_usu_tar")
)
WITH (oids = false);

COMMENT ON TABLE "public"."usuario_tareas" IS 'Usuario asignado a una tarea';


DROP TABLE IF EXISTS "usuarios";
DROP SEQUENCE IF EXISTS usuarios_id_usu_seq;
CREATE SEQUENCE usuarios_id_usu_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."usuarios" (
    "id_usu" bigint DEFAULT nextval('usuarios_id_usu_seq') NOT NULL,
    "usu_nombre" character varying(50) NOT NULL,
    "usu_perfil" smallint NOT NULL,
    "fec_registro" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usu")
)
WITH (oids = false);

COMMENT ON TABLE "public"."usuarios" IS 'Tabla de usuarios';

INSERT INTO "usuarios" ("id_usu", "usu_nombre", "usu_perfil", "fec_registro") VALUES
(1,	'Andres Silva',	1,	'2026-05-14 00:11:41.571561'),
(2,	'Brieth de tar',	2,	'2026-05-14 00:12:00.659703'),
(3,	'Jaime Lanister',	2,	'2026-05-14 00:12:16.109358'),
(4,	'Tyrion Lanister',	2,	'2026-05-14 00:12:25.531732'),
(5,	'Ned Stark',	1,	'2026-05-14 00:12:46.467109'),
(6,	'Margery Tyrell',	2,	'2026-05-14 00:16:33.895745');

ALTER TABLE ONLY "public"."aputes_tarea" ADD CONSTRAINT "aputes_tarea_id_tarea_fkey" FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."aputes_tarea" ADD CONSTRAINT "aputes_tarea_id_usu_fkey" FOREIGN KEY (id_usu) REFERENCES usuarios(id_usu) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."tareas" ADD CONSTRAINT "tareas_id_pyt_fkey" FOREIGN KEY (id_pyt) REFERENCES proyectos(id_pyt) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."usuario_proyecto" ADD CONSTRAINT "usuario_proyecto_id_pyt_fkey" FOREIGN KEY (id_pyt) REFERENCES proyectos(id_pyt) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."usuario_proyecto" ADD CONSTRAINT "usuario_proyecto_id_usu_fkey" FOREIGN KEY (id_usu) REFERENCES usuarios(id_usu) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."usuario_proyecto" ADD CONSTRAINT "usuario_proyecto_id_usu_pyt_fkey" FOREIGN KEY (id_usu_pyt) REFERENCES usuarios(id_usu) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."usuario_tareas" ADD CONSTRAINT "usuario_tareas_id_tarea_fkey" FOREIGN KEY (id_tarea) REFERENCES tareas(id_tarea) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."usuario_tareas" ADD CONSTRAINT "usuario_tareas_id_usu_fkey" FOREIGN KEY (id_usu) REFERENCES usuarios(id_usu) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."usuario_tareas" ADD CONSTRAINT "usuario_tareas_id_usu_tar_fkey" FOREIGN KEY (id_usu_tar) REFERENCES usuarios(id_usu) NOT DEFERRABLE;

-- 2026-05-15 05:46:44 UTC