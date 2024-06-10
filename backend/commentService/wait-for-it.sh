#!/bin/bash
# wait-for-it.sh

host="$1"
port="$2"
shift 2
cmd="$@"

echo "Waiting for $host:$port..."

while ! nc -z "$host" "$port"; do
  sleep 0.1
done

echo "Connection to $host:$port successful"
exec $cmd