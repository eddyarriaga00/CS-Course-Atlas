"""Runs a .sql file against a fresh in-memory SQLite database and prints it like a terminal
session: each SELECT (and each UPDATE/DELETE) is shown after "sqlite> ", followed by its result
as a table. CREATE and INSERT statements run silently. Used by run_course_examples.js."""
import sqlite3
import sys


def table(columns, rows):
    cells = [[("NULL" if v is None else str(v)) for v in row] for row in rows]
    widths = [max([len(c)] + [len(r[i]) for r in cells]) for i, c in enumerate(columns)]
    line = "+" + "+".join("-" * (w + 2) for w in widths) + "+"
    fmt = lambda values: "| " + " | ".join(v.ljust(w) for v, w in zip(values, widths)) + " |"
    out = [line, fmt(columns), line] + [fmt(r) for r in cells] + [line]
    return "\n".join(out)


def statements(source):
    buf = []
    for line in source.splitlines():
        if not buf and (not line.strip() or line.strip().startswith("--")):
            continue
        buf.append(line)
        text = "\n".join(buf)
        if sqlite3.complete_statement(text):
            yield text.strip()
            buf = []
    if "".join(buf).strip():
        yield "\n".join(buf).strip()


def main():
    source = open(sys.argv[1], encoding="utf-8").read()
    db = sqlite3.connect(":memory:", isolation_level=None)  # autocommit: BEGIN/COMMIT run as written
    db.execute("PRAGMA foreign_keys = ON")
    first = True
    had_output = False
    for stmt in statements(source):
        keyword = stmt.lstrip("(").split(None, 1)[0].rstrip(";").upper()
        shown = keyword in ("SELECT", "WITH", "UPDATE", "DELETE", "EXPLAIN", "BEGIN", "COMMIT", "ROLLBACK")
        if shown:
            # A blank line separates a statement from the result above it.
            if not first and had_output:
                print()
            first = False
            had_output = keyword not in ("BEGIN", "COMMIT", "ROLLBACK")
            lines = stmt.splitlines()
            print("sqlite> " + lines[0])
            for more in lines[1:]:
                print("   ...> " + more)
        try:
            cur = db.execute(stmt)
        except sqlite3.Error as error:
            if not shown:
                if not first and had_output:
                    print()
                first = False
                print("sqlite> " + stmt.splitlines()[0] + (" ..." if "\n" in stmt else ""))
            had_output = True
            print("Error: " + str(error))
            continue
        if keyword == "EXPLAIN":
            # Like the sqlite3 tool: just the plan steps.
            print("QUERY PLAN")
            for row in cur.fetchall():
                print("`--" + row[-1])
            continue
        if cur.description:
            rows = cur.fetchall()
            columns = [d[0] for d in cur.description]
            print(table(columns, rows) if rows else "(no rows)")
        elif keyword in ("UPDATE", "DELETE"):
            print("(%d row%s %s)" % (cur.rowcount, "" if cur.rowcount == 1 else "s", "updated" if keyword == "UPDATE" else "deleted"))


main()
