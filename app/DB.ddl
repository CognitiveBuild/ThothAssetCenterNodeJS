--<ScriptOptions statementTerminator=";"/>

CREATE SCHEMA "DASH110031" AUTHORIZATION "DASH110031";

CREATE TABLE "DASH110031"."ASSET" (
		"ASSET_ID" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH 1 INCREMENT BY 1 MINVALUE -2147483648 MAXVALUE 2147483647 NO CYCLE CACHE 20 NO ORDER ), 
		"TITLE" VARCHAR(120), 
		"TEAM_ID" INTEGER, 
		"PUBLISH_DATE" DATE, 
		"INDUSTRY_ID" INTEGER
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."ASSETLIST" (
		"ASSETLIST_ID" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH 1 INCREMENT BY 1 MINVALUE -2147483648 MAXVALUE 2147483647 NO CYCLE CACHE 20 NO ORDER ), 
		"ASSET_ID" INTEGER, 
		"ASSETTYPE_ID" INTEGER, 
		"NAME" VARCHAR(50), 
		"DESCRIPTION" VARCHAR(120), 
		"URL" VARCHAR(120), 
		"SERVICEURL" VARCHAR(120)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."ASSETLIST_VERSION" (
		"VERSION_ID" INTEGER NOT NULL, 
		"VERSION_DESCRIPTION" VARCHAR(120), 
		"ASSETLIST_ID" INTEGER, 
		"ASSET_ID" INTEGER, 
		"TYPE_ID" INTEGER, 
		"NAME" VARCHAR(50), 
		"DESCRIPTION" VARCHAR(120), 
		"URL" VARCHAR(120), 
		"SERVICEURL" VARCHAR(120), 
		"ASSETTYPE_ID" CHAR(5)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."ASSETTYPE" (
		"ASSETTYPE_ID" INTEGER NOT NULL, 
		"NAME" VARCHAR(50)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."INDUSTRY" (
		"INDUSTRY_ID" INTEGER NOT NULL, 
		"NAME" VARCHAR(50), 
		"DESCRIPTION" VARCHAR(120)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."M_ASSET_TAG" (
		"ASSET_ID" INTEGER NOT NULL, 
		"TAG_ID" INTEGER NOT NULL
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."M_ASSET_TECHNOLOGY" (
		"ASSET_ID" INTEGER, 
		"TECHNOLOGY_ID" INTEGER
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."M_PROJECT_USER" (
		"PROJECT_ID" INTEGER, 
		"USER_ID" CHAR(5)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."M_ROLE_USER" (
		"ROLE_ID" INTEGER, 
		"USER_ID" INTEGER
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."M_TAG_TAGGROUP" (
		"TAGGROUP_ID" INTEGER, 
		"TAG_ID" INTEGER
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."M_TEAM_PROJECT" (
		"TEAM_ID" INTEGER, 
		"PROJECT_ID" INTEGER
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."M_TEAM_USER" (
		"TEAM_ID" INTEGER, 
		"USER_ID" INTEGER
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."PROJECT" (
		"PROJECT_ID" INTEGER NOT NULL, 
		"NAME" VARCHAR(50), 
		"DESCRIPTION" VARCHAR(120)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."ROLE" (
		"ROLE_ID" INTEGER NOT NULL, 
		"NAME" VARCHAR(50)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."TAG" (
		"TAG_ID" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH 1 INCREMENT BY 1 MINVALUE -2147483648 MAXVALUE 2147483647 NO CYCLE CACHE 20 NO ORDER ), 
		"NAME" VARCHAR(100) NOT NULL, 
		"DESCRIPTION" VARCHAR(120)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."TAGGROUP" (
		"TAGGROUP_ID" INTEGER NOT NULL GENERATED ALWAYS AS IDENTITY ( START WITH 1 INCREMENT BY 1 MINVALUE -2147483648 MAXVALUE 2147483647 NO CYCLE CACHE 20 NO ORDER ), 
		"TAGGROUP_NAME" VARCHAR(80)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."TEAM" (
		"TEAM_ID" INTEGER NOT NULL, 
		"NAME" VARCHAR(50), 
		"DESCRIPTION" VARCHAR(120)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."TECHNOLOGY" (
		"TECHNOLOGY_ID" INTEGER NOT NULL, 
		"NAME" VARCHAR(50), 
		"DESCRIPTION" VARCHAR(120)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

CREATE TABLE "DASH110031"."USER" (
		"USER_ID" INTEGER NOT NULL, 
		"NAME" VARCHAR(50), 
		"EMAIL" VARCHAR(50), 
		"TWITTER" VARCHAR(50)
	)
	DATA CAPTURE NONE 
	COMPRESS NO;

ALTER TABLE "DASH110031"."ASSET" ADD CONSTRAINT "ASSET_PK" PRIMARY KEY
	("ASSET_ID");

ALTER TABLE "DASH110031"."ASSETLIST" ADD CONSTRAINT "ASSETLIST_PK" PRIMARY KEY
	("ASSETLIST_ID");

ALTER TABLE "DASH110031"."ASSETLIST_VERSION" ADD CONSTRAINT "ASSETLIST_VERSION_PK" PRIMARY KEY
	("VERSION_ID");

ALTER TABLE "DASH110031"."ASSETTYPE" ADD CONSTRAINT "ASSETTYPE_PK" PRIMARY KEY
	("ASSETTYPE_ID");

ALTER TABLE "DASH110031"."INDUSTRY" ADD CONSTRAINT "INDUSTRY_PK" PRIMARY KEY
	("INDUSTRY_ID");

ALTER TABLE "DASH110031"."M_ASSET_TAG" ADD CONSTRAINT "M_ASSET_TAG_PK" PRIMARY KEY
	("ASSET_ID", 
	 "TAG_ID");

ALTER TABLE "DASH110031"."PROJECT" ADD CONSTRAINT "PROJECT_PK" PRIMARY KEY
	("PROJECT_ID");

ALTER TABLE "DASH110031"."ROLE" ADD CONSTRAINT "ROLE_PK" PRIMARY KEY
	("ROLE_ID");

ALTER TABLE "DASH110031"."TAG" ADD CONSTRAINT "TAG_PK" PRIMARY KEY
	("TAG_ID");

ALTER TABLE "DASH110031"."TAGGROUP" ADD CONSTRAINT "TAG_GROUP_PK" PRIMARY KEY
	("TAGGROUP_ID");

ALTER TABLE "DASH110031"."TEAM" ADD CONSTRAINT "TEAM_PK" PRIMARY KEY
	("TEAM_ID");

ALTER TABLE "DASH110031"."TECHNOLOGY" ADD CONSTRAINT "TECHNOLOGY_PK" PRIMARY KEY
	("TECHNOLOGY_ID");

ALTER TABLE "DASH110031"."USER" ADD CONSTRAINT "USER_PK" PRIMARY KEY
	("USER_ID");

CREATE VIEW "DASH110031"."V_ASSET_TECHNOLOGY" ("ASSET_ID", "TECHNOLOGY_NAME") AS
select mat.asset_id,LISTAGG(technology.name, ',') WITHIN GROUP(ORDER BY mat.asset_id) AS employees
 from DASH110031.m_asset_technology mat,DASH110031.technology technology
 where mat.technology_id = technology.technology_id
  GROUP BY mat.asset_id;

