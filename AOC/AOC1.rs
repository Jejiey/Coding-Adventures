#include <stdio.h>
#include <stdlib.h>
int main()
{
    FILE *file;
    file = fopen("AOC1", "r");
    char *line = NULL;
    size_t len = 0;
    size_t read;

    while ((read = getline(&line, &len, file)) != -1)
    {
        printf("%s", line);
    }
}
