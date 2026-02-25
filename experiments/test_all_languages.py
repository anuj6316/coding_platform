import judge0
import json

# Define snippets for various language patterns
# Order matters if using substring matching, or we use exact matching/smarter matching.
SNIPPETS = {
    "assembly": """section .data
    msg db "Hello World"
    len equ $ - msg
section .text
    global _start
_start:
    mov eax, 4
    mov ebx, 1
    mov ecx, msg
    mov edx, len
    int 0x80
    mov eax, 1
    xor ebx, ebx
    int 0x80""",
    "bash": """echo -n "Hello World\"""",
    "basic": """10 PRINT "Hello World\"""",
    "c++": """#include <iostream>
int main() { std::cout << "Hello World"; return 0; }""",
    "c (": """#include <stdio.h>
int main() { printf("Hello World"); return 0; }""",
    "clojure": """(print "Hello World")""",
    "c#": """using System; class MainClass { public static void Main (string[] args) { Console.Write("Hello World"); } }""",
    "cobol": """IDENTIFICATION DIVISION.
PROGRAM-ID. HELLO-WORLD.
PROCEDURE DIVISION.
DISPLAY "Hello World".
STOP RUN.""",
    "common lisp": """(format t "Hello World")""",
    "dart": """void main() { print("Hello World"); }""",
    "d (": """import std.stdio; void main() { write("Hello World"); }""",
    "elixir": """IO.write "Hello World\"""",
    "erlang": """main(_) -> io:format("Hello World").""", # For escript
    "f#": """printf "Hello World\"""",
    "fortran": """program hello
print *, "Hello World"
end program hello""",
    "go": """package main
import "fmt"
func main() { fmt.Print("Hello World") }""",
    "groovy": """print "Hello World\"""",
    "haskell": """main = putStr "Hello World\"""",
    "java": """public class Main { public static void main(String[] args) { System.out.print("Hello World"); } }""",
    "javascript": """process.stdout.write("Hello World");""",
    "kotlin": """fun main() { print("Hello World") }""",
    "lua": """io.write("Hello World")""",
    "objective-c": """#import <Foundation/Foundation.h>
#include <stdio.h>
int main() { @autoreleasepool { printf("Hello World"); } return 0; }""",
    "ocaml": """print_string "Hello World\"""",
    "octave": """printf('Hello World');""",
    "pascal": """program HelloWorld; begin write('Hello World'); end.""",
    "perl": """print "Hello World";""",
    "php": """<?php echo "Hello World";""",
    "prolog": """:- initialization(main).
main :- write('Hello World'), halt.""",
    "python": """import sys; print('Hello World', end='')""",
    "rust": """fn main() { print!("Hello World"); }""",
    "r (": """cat("Hello World")""",
    "scala": """object Main { def main(args: Array[String]): Unit = { print("Hello World") } }""",
    "sql": """SELECT 'Hello World';""",
    "swift": """print("Hello World", terminator: "")""",
    "typescript": """console.log("Hello World");""",
    "visual basic.net": """Imports System
Module HelloWorld
Sub Main()
Console.Write("Hello World")
End Sub
End Module""",
}

def get_snippet(lang_name):
    name_lower = lang_name.lower()
    # Try more specific matches first or exact matches
    # We'll use a priority list or just check long keys first
    sorted_patterns = sorted(SNIPPETS.keys(), key=len, reverse=True)
    for pattern in sorted_patterns:
        if pattern in name_lower:
            return SNIPPETS[pattern]
    return None

def main():
    client = judge0.get_client()
    languages = client.languages
    
    results = []
    
    print(f"Found {len(languages)} languages. Testing...")
    
    for lang in languages:
        snippet = get_snippet(lang.name)
        if not snippet:
            print(f"[-] No snippet for {lang.name} (id: {lang.id})")
            continue
            
        print(f"[*] Testing {lang.name} (id: {lang.id})...", end=" ", flush=True)
        try:
            result = judge0.run(source_code=snippet, language=lang.id)
            
            if result.stdout and "Hello World" in result.stdout:
                print("PASSED")
                status = "PASSED"
            else:
                print(f"FAILED (stdout: {result.stdout!r}, stderr: {result.stderr!r}, status: {result.status})")
                status = "FAILED"
            
            results.append({
                "id": lang.id,
                "name": lang.name,
                "status": status,
                "stdout": result.stdout,
                "stderr": result.stderr,
                "judge0_status": str(result.status)
            })
        except Exception as e:
            print(f"ERROR: {e}")
            results.append({
                "id": lang.id,
                "name": lang.name,
                "status": "ERROR",
                "error": str(e)
            })

    # Summary
    passed = len([r for r in results if r["status"] == "PASSED"])
    total = len(results)
    print(f"\nSummary: {passed}/{total} passed.")
    
    with open("experiments/test_results.json", "w") as f:
        json.dump(results, f, indent=2)

if __name__ == "__main__":
    main()
