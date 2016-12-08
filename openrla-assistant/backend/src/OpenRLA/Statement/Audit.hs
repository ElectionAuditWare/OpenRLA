module OpenRLA.Statement.Audit where

import           Data.Text (Text)
import qualified Database.SQLite.Simple as Sql
import           Database.SQLite.Simple (Connection, Only(..))

import           OpenRLA.Statement (justOneIO, oneRowIO)
import           OpenRLA.Types


index :: Connection -> (Integer, Integer) -> IO [Audit]
index conn args = Sql.query conn s args
  where
    s = "select id, election_id, date, risk_limit from audit order by date limit ? offset ?"

create :: Connection -> (Integer, Text, Double) -> IO Audit
create conn args = do
  let s = "insert into audit (election_id, date, risk_limit) values (?, ?, ?)"
  Sql.execute conn s args
  rowId <- Sql.lastInsertRowId conn
  let s' = "select id, election_id, date, risk_limit from audit where id = ?"
  rows <- Sql.query conn s' (Only rowId)
  oneRowIO rows

getById :: Connection -> Integer -> IO (Maybe Audit)
getById conn auId = Sql.query conn s (Only auId) >>= justOneIO
  where s = "select id, election_id, date, risk_limit from audit where id = ?"

setById  :: Connection -> Audit -> IO ()
setById conn audit = Sql.execute conn s audit
  where
    s = "insert or update into audit (id, election_id, date, risk_limit) values (?, ?, ?, ?)"

getActiveAudit :: Connection -> IO (Maybe Audit)
getActiveAudit = undefined

setActiveAudit :: Connection -> Integer -> IO ()
setActiveAudit = undefined

indexMarks :: Connection -> Integer -> IO [AuditMark]
indexMarks conn auId = Sql.query conn s (Only auId)
  where
    s = "select audit_id, ballot_id, contest_id, candidate_id from audit_mark where audit_id = ?"

createMark :: Connection -> AuditMark -> IO ()
createMark conn auditMark = Sql.execute conn s auditMark
  where
    s = "insert or replace into audit_mark (audit_id, ballot_id, contest_id, candidate_id) values (?, ?, ?, ?)"