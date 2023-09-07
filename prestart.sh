#!/bin/bash

# Check and kill processes on port 4000
PORT=4000
lsof -i :$PORT | awk 'NR!=1 {print $2}' | xargs -I {} kill -9 {}



# Check and kill processes on port 3000
PORT=3000
lsof -i :$PORT | awk 'NR!=1 {print $2}' | xargs -I {} kill -9 {}
