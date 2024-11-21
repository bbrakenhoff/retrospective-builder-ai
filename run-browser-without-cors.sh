# Close Arc browser
pkill Arc || killall Arc

# Wait a moment to ensure it's closed
sleep 1

# Open Arc with CORS disabled
open -na "Arc" --args --disable-web-security --user-data-dir="/tmp_arc_profile/"
