module TestSupport where

import qualified Database.SQLite.Simple as Sql
import qualified System.Directory as D
import           System.FilePath ((</>))
import qualified System.IO.Temp as Temp

import qualified OpenRLA.Db as Db
import           OpenRLA.Types (State(..))


withDataDir :: (FilePath -> IO a) -> IO a
withDataDir = Temp.withSystemTempDirectory "openrla_test_data"

withState :: (State -> IO a) -> IO a
withState cb = withDataDir $ \dataDir -> do
  let dataRel = (dataDir </>)
      dbPath  = dataRel "openrla_test.db"
  conn <- Sql.open dbPath
  Db.init conn
  let state = State { .. }
  cb state