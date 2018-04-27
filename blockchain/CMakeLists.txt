project(blockchain)

SET(blockchain_source_files block.cpp blockchain.cpp sha256.cpp main.cpp)
SET(blockchain_header_files block.h blockchain.h sha256.h)

include_directories(${CMAKE_CURRENT_SOURCE_DIR})

add_executable(blockchain_test_program ${blockchain_source_files})
