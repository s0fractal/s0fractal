.PHONY: all pdf html clean

all: pdf html

pdf: cv.pdf

html: cv.html

cv.pdf: cv.md
	pandoc cv.md -o cv.pdf --pdf-engine=typst

cv.html: cv.md style.css
	pandoc cv.md -o cv.html --standalone --css=style.css --embed-resources

clean:
	rm -f cv.pdf cv.html
