<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Bankaccountgroup extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
      CREATE VIEW bank_account_group AS
      (
        SELECT * FROM (SELECT 
(CASE WHEN credituser IS NULL THEN 
                    CASE WHEN devituser IS NULL THEN 
                        NULL
                    ELSE devituser END
                ELSE credituser END)AS `User_ID`,
(CASE WHEN creditbankid IS NULL THEN  
                    CASE WHEN devitbankid IS NULL THEN 
                        NULL
                    ELSE devitbankid END
                ELSE creditbankid END)AS `bank_id`,
        (CASE WHEN creditdate IS NULL THEN 
                    CASE WHEN devitdate IS NULL THEN 
                        NULL
                    ELSE devitdate END
                ELSE creditdate END)AS `date`,
        (CASE WHEN Credit IS NULL THEN '0' ELSE Credit END)AS `Credit`,
         (CASE WHEN Devit IS NULL THEN '0' ELSE Devit END)AS `Devit`
 FROM (SELECT * FROM
(SELECT `User_ID` AS credituser, `bank_id` AS creditbankid, `date` AS creditdate, SUM(`amount`) AS 'Credit'
FROM `shooping_project`.`bank_data` WHERE `status`='Credit' GROUP BY creditbankid,creditdate,credituser) AS cred
RIGHT JOIN
(SELECT `User_ID` AS devituser,`bank_id` AS devitbankid, `date` AS devitdate, SUM(`amount`) AS 'Devit'
FROM `shooping_project`.`bank_data` WHERE `status`='Devit'  GROUP BY devitbankid,devitdate,devituser) AS dev ON cred.creditdate=dev.devitdate  AND `cred`.`creditbankid` = `dev`.`devitbankid`

UNION

SELECT * FROM
(SELECT `User_ID` AS credituser, `bank_id` AS creditbankid, `date` AS creditdate, SUM(`amount`) AS 'Credit'
FROM `shooping_project`.`bank_data` WHERE `status`='Credit' GROUP BY creditbankid,creditdate,credituser) AS cred
LEFT JOIN
(SELECT `User_ID` AS devituser,`bank_id` AS devitbankid, `date` AS devitdate, SUM(`amount`) AS 'Devit'
FROM `shooping_project`.`bank_data` WHERE `status`='Devit'  GROUP BY devitbankid,devitdate,devituser) AS dev ON cred.creditdate=dev.devitdate  AND `cred`.`creditbankid` = `dev`.`devitbankid`
)AS `lastbank`)AS `Bank_Group_Data`    
      )
    ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS bank_account_group');
    }
}
