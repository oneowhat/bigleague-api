
COPY guilds("id", "name", "active") FROM 'C:\Users\brendan.kendrick\Documents\GitHub\bigleague-api\data\guilds.txt' DELIMITER ',' CSV
COPY positions("id", "name") FROM 'C:\Users\brendan.kendrick\Documents\GitHub\bigleague-api\data\positions.txt' DELIMITER ',' CSV
COPY players("name", "guildId", "positionId") FROM 'C:\Users\brendan.kendrick\Documents\GitHub\bigleague-api\data\players.txt' DELIMITER ',' CSV
