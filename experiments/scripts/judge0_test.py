# pip install judge0
import judge0
result = judge0.run(source_code="print(f'hello, {input()}')", stdin="Alice", language=judge0.PYTHON)
print(result.stdout)

with open("/home/mindmap/Desktop/coding_platform/experiments/scripts/hello.cpp", 'r') as f:
    source_code = f.read()

cpp_result = judge0.run(source_code=source_code, stdin="Alice", language=judge0.CPP)
print(cpp_result.stdout)