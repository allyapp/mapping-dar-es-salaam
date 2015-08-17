osmosis  --read-pbf  file=tanzania-latest.osm.pbf --bounding-box top=-6.502 left=38.894 bottom=-7.120 right=39.661 --write-pbf dar-0915.osm.pbf

osmosis  --read-pbf  file=tanzania-150801.osm.pbf --bounding-box top=-6.502 left=38.894 bottom=-7.120 right=39.661 --write-pbf dar-0815.osm.pbf

osmosis  --read-pbf  file=tanzania-150701.osm.pbf --bounding-box top=-6.502 left=38.894 bottom=-7.120 right=39.661 --write-pbf dar-0715.osm.pbf

osmosis  --read-pbf  file=tanzania-150601.osm.pbf --bounding-box top=-6.502 left=38.894 bottom=-7.120 right=39.661 --write-pbf dar-0615.osm.pbf

osmosis  --read-pbf  file=tanzania-150501.osm.pbf --bounding-box top=-6.502 left=38.894 bottom=-7.120 right=39.661 --write-pbf dar-0515.osm.pbf

osmosis  --read-pbf  file=tanzania-150401.osm.pbf --bounding-box top=-6.502 left=38.894 bottom=-7.120 right=39.661 --write-pbf dar-0415.osm.pbf

osmosis  --read-pbf  file=tanzania-150101.osm.pbf --bounding-box top=-6.502 left=38.894 bottom=-7.120 right=39.661 --write-pbf dar-0115.osm.pbf

psql dar
drop schema public cascade;
create schema public;
create extension postgis;
\q

# 0115
osm2pgsql -c -G -U ustroetz -d dar dar-0115.osm.pbf
psql dar
create table dar_0115_highway as select osm_id, highway, building, way from planet_osm_line where highway IS NOT NULL;
create table dar_0115_building as select osm_id, highway, building, way from planet_osm_polygon where building IS NOT NULL;
drop table planet_osm_line;
drop table planet_osm_polygon;
drop table planet_osm_point;
drop table planet_osm_roads;
\q

# 0615
osm2pgsql -c -G -U ustroetz -d dar dar-0615.osm.pbf
psql dar
create table dar_0615_building as select osm_id, highway, building, way from planet_osm_polygon where building IS NOT NULL AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0115_building 
   WHERE planet_osm_polygon.osm_id = dar_0115_building.osm_id 
);

create table dar_0615_highway as select osm_id, highway, building, way from planet_osm_line where highway IS NOT NULL AND  NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0115_highway 
   WHERE planet_osm_line.osm_id = dar_0115_highway.osm_id 
);
drop table planet_osm_line;
drop table planet_osm_polygon;
drop table planet_osm_point;
drop table planet_osm_roads;
\q

# 0715
osm2pgsql -c -G -U ustroetz -d dar dar-0715.osm.pbf
psql dar
create table dar_0715_building as select osm_id, highway, building, way from planet_osm_polygon where building IS NOT NULL AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0115_building 
   WHERE planet_osm_polygon.osm_id = dar_0115_building.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0615_building
   WHERE planet_osm_polygon.osm_id = dar_0615_building.osm_id 
);

create table dar_0715_highway as select osm_id, highway, building, way from planet_osm_line where highway IS NOT NULL AND  NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0115_highway 
   WHERE planet_osm_line.osm_id = dar_0115_highway.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0615_highway
   WHERE planet_osm_line.osm_id = dar_0615_highway.osm_id 
);
drop table planet_osm_line;
drop table planet_osm_polygon;
drop table planet_osm_point;
drop table planet_osm_roads;
\q

# 0815
osm2pgsql -c -G -U ustroetz -d dar dar-0815.osm.pbf
psql dar
create table dar_0815_building as select osm_id, highway, building, way from planet_osm_polygon where building IS NOT NULL AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0115_building 
   WHERE planet_osm_polygon.osm_id = dar_0115_building.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0615_building 
   WHERE planet_osm_polygon.osm_id = dar_0615_building.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0715_building 
   WHERE planet_osm_polygon.osm_id = dar_0715_building.osm_id 
);

create table dar_0815_highway as select osm_id, highway, building, way from planet_osm_line where highway IS NOT NULL AND  NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0115_highway 
   WHERE planet_osm_line.osm_id = dar_0115_highway.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0615_highway
   WHERE planet_osm_line.osm_id = dar_0615_highway.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0715_highway
   WHERE planet_osm_line.osm_id = dar_0715_highway.osm_id 
);
drop table planet_osm_line;
drop table planet_osm_polygon;
drop table planet_osm_point;
drop table planet_osm_roads;
\q

# 0915
osm2pgsql -c -G -U ustroetz -d dar dar-0915.osm.pbf
psql dar
create table dar_0915_building as select osm_id, highway, building, way from planet_osm_polygon where building IS NOT NULL AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0115_building 
   WHERE planet_osm_polygon.osm_id = dar_0115_building.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0615_building 
   WHERE planet_osm_polygon.osm_id = dar_0615_building.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0715_building 
   WHERE planet_osm_polygon.osm_id = dar_0715_building.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0815_building 
   WHERE planet_osm_polygon.osm_id = dar_0815_building.osm_id 
);

create table dar_0915_highway as select osm_id, highway, building, way from planet_osm_line where highway IS NOT NULL AND  NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0115_highway 
   WHERE planet_osm_line.osm_id = dar_0115_highway.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0615_highway
   WHERE planet_osm_line.osm_id = dar_0615_highway.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0715_highway
   WHERE planet_osm_line.osm_id = dar_0715_highway.osm_id 
)
AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0815_highway
   WHERE planet_osm_line.osm_id = dar_0815_highway.osm_id 
);
drop table planet_osm_line;
drop table planet_osm_polygon;
drop table planet_osm_point;
drop table planet_osm_roads;
\q

# 0915-2
osm2pgsql -c -G -U ustroetz -d dar dar-0915.osm.pbf
psql dar
create table dar_0915_building as select osm_id, highway, building, way from planet_osm_polygon where building IS NOT NULL AND NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0115_building 
   WHERE planet_osm_polygon.osm_id = dar_0115_building.osm_id 

);

create table dar_0915_highway as select osm_id, highway, building, way from planet_osm_line where highway IS NOT NULL AND  NOT EXISTS  
(  
   SELECT osm_id 
   FROM dar_0115_highway 
   WHERE planet_osm_line.osm_id = dar_0115_highway.osm_id 
);
drop table planet_osm_line;
drop table planet_osm_polygon;
drop table planet_osm_point;
drop table planet_osm_roads;
\q


ogr2ogr -f GeoJSON dar-0115.geojson "PG:host=localhost dbname=dar user=ustroetz" -sql "SELECT way, building, highway from dar_0115_building UNION SELECT way, building, highway from dar_0115_highway" -s_srs EPSG:900913 -t_srs EPSG:4326

ogr2ogr -f GeoJSON dar-0615.geojson "PG:host=localhost dbname=dar user=ustroetz" -sql "SELECT way, building, highway from dar_0615_building UNION SELECT way, building, highway from dar_0615_highway" -s_srs EPSG:900913 -t_srs EPSG:4326

ogr2ogr -f GeoJSON dar-0715.geojson "PG:host=localhost dbname=dar user=ustroetz" -sql "SELECT way, building, highway from dar_0715_building UNION SELECT way, building, highway from dar_0715_highway" -s_srs EPSG:900913 -t_srs EPSG:4326

ogr2ogr -f GeoJSON dar-0815.geojson "PG:host=localhost dbname=dar user=ustroetz" -sql "SELECT way, building, highway from dar_0815_building UNION SELECT way, building, highway from dar_0815_highway" -s_srs EPSG:900913 -t_srs EPSG:4326

ogr2ogr -f GeoJSON dar-0915.geojson "PG:host=localhost dbname=dar user=ustroetz" -sql "SELECT way, building, highway from dar_0915_building UNION SELECT way, building, highway from dar_0915_highway" -s_srs EPSG:900913 -t_srs EPSG:4326

