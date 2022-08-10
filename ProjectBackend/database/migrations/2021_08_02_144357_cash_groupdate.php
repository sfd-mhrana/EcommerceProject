<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CashGroupdate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
        CREATE VIEW `shooping_project`.`cash_groupdate` 
                AS
            (
            SELECT (CASE WHEN ISNULL(`lastonecash`.`devituser`) THEN (CASE WHEN ISNULL(`lastonecash`.`credituser`) THEN NULL ELSE `lastonecash`.`credituser` END) ELSE `lastonecash`.`devituser` END) AS `User_ID`,(CASE WHEN ISNULL(`lastonecash`.`debitdate`) THEN (CASE WHEN ISNULL(`lastonecash`.`creditdate`) THEN NULL ELSE `lastonecash`.`creditdate` END) ELSE `lastonecash`.`debitdate` END) AS `Date`,(CASE WHEN ISNULL(`lastonecash`.`Credit`) THEN '0' ELSE `lastonecash`.`Credit` END) AS `Credit`,(CASE WHEN ISNULL(`lastonecash`.`Devit`) THEN '0' ELSE `lastonecash`.`Devit` END) AS `Devit` FROM (SELECT `dl`.`devituser` AS `devituser`,`dl`.`debitdate` AS `debitdate`,`dl`.`Devit` AS `Devit`,`dl`.`dstatus` AS `dstatus`,`cl`.`credituser` AS `credituser`,`cl`.`creditdate` AS `creditdate`,`cl`.`Credit` AS `Credit`,`cl`.`cstatus` AS `cstatus` FROM (((SELECT `d`.`devituser` AS `devituser`,`d`.`debitdate` AS `debitdate`,`d`.`Devit` AS `Devit`,`d`.`dstatus` AS `dstatus` FROM (SELECT `shooping_project`.`Cash`.`User_ID` AS `devituser`,`shooping_project`.`Cash`.`Date` AS `debitdate`,SUM(`shooping_project`.`Cash`.`Amount`) AS `Devit`,`shooping_project`.`Cash`.`Status` AS `dstatus` FROM `shooping_project`.`Cash` GROUP BY `shooping_project`.`Cash`.`Date`,`dstatus`,`devituser`) `d` WHERE (`d`.`dstatus` = 'Devit'))) `dl` LEFT JOIN (SELECT `c`.`credituser` AS `credituser`,`c`.`creditdate` AS `creditdate`,`c`.`Credit` AS `Credit`,`c`.`cstatus` AS `cstatus` FROM (SELECT `shooping_project`.`Cash`.`User_ID` AS `credituser`,`shooping_project`.`Cash`.`Date` AS `creditdate`,SUM(`shooping_project`.`Cash`.`Amount`) AS `Credit`,`shooping_project`.`Cash`.`Status` AS `cstatus` FROM `shooping_project`.`Cash` GROUP BY `shooping_project`.`Cash`.`Date`,`cstatus`,`credituser`) `c` WHERE (`c`.`cstatus` = 'Credit')) `cl` ON((`cl`.`creditdate` = `dl`.`debitdate` AND `cl`.`credituser` = `dl`.`devituser`))) UNION SELECT `dl`.`devituser` AS `devituser`,`dl`.`debitdate` AS `debitdate`,`dl`.`Devit` AS `Devit`,`dl`.`dstatus` AS `dstatus`,`cl`.`credituser` AS `credituser`,`cl`.`creditdate` AS `creditdate`,`cl`.`Credit` AS `Credit`,`cl`.`cstatus` AS `cstatus` FROM (((SELECT `c`.`credituser` AS `credituser`,`c`.`creditdate` AS `creditdate`,`c`.`Credit` AS `Credit`,`c`.`cstatus` AS `cstatus` FROM (SELECT `shooping_project`.`Cash`.`User_ID` AS `credituser`,`shooping_project`.`Cash`.`Date` AS `creditdate`,SUM(`shooping_project`.`Cash`.`Amount`) AS `Credit`,`shooping_project`.`Cash`.`Status` AS `cstatus` FROM `shooping_project`.`Cash` GROUP BY `shooping_project`.`Cash`.`Date`,`cstatus`,`credituser`) `c` WHERE (`c`.`cstatus` = 'Credit'))) `cl` LEFT JOIN (SELECT `d`.`devituser` AS `devituser`,`d`.`debitdate` AS `debitdate`,`d`.`Devit` AS `Devit`,`d`.`dstatus` AS `dstatus` FROM (SELECT `shooping_project`.`Cash`.`User_ID` AS `devituser`,`shooping_project`.`Cash`.`Date` AS `debitdate`,SUM(`shooping_project`.`Cash`.`Amount`) AS `Devit`,`shooping_project`.`Cash`.`Status` AS `dstatus` FROM `shooping_project`.`Cash` GROUP BY `shooping_project`.`Cash`.`Date`,`dstatus`,`devituser`) `d` WHERE (`d`.`dstatus` = 'Devit')) `dl` ON((`cl`.`creditdate` = `dl`.`debitdate` AND `cl`.`credituser` = `dl`.`devituser`)))) `lastonecash`
            );
        "); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS  `shooping_project`.`cash_groupdate`');
    }
}
