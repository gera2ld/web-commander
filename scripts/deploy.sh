set -e

rm -rf dist
yarn build

DIST_PKG=dist.tar.gz
BASE_DIR='~/Git/garfield'
DATA_DIR=$BASE_DIR/data
DIST_DIR=$BASE_DIR/dist

tar -zcf $DIST_PKG -C dist .
scp $DIST_PKG gerald:$DATA_DIR
ssh gerald "mkdir -p $DIST_DIR && tar -zxf $DATA_DIR/$DIST_PKG -C $DIST_DIR"
