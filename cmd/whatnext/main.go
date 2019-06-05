package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

var listOfTasks []Todo
var homePage *template.Template

type Todo struct {
	Task string
	Deadline string
	Id int
}

func main() {
	var err error
	homePage, err = template.ParseFiles("../../templates/index.html")
	if err != nil {
		fmt.Printf("could not parse index.html: %s", err)
		return
	}

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("../../static"))))
	http.HandleFunc("/", homePageHandler)
	http.HandleFunc("/create", formHandler)
	http.HandleFunc("/delete", deleteHandler)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("failed to listen and serve")
		os.Exit(1)
	}
}

func formHandler(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseForm(); err != nil {
		fmt.Printf("unable to parse form data: %s", err)
		return
	}

	deadline, err := time.Parse("02/01/06", r.Form.Get("deadline"))
	if err != nil {
		fmt.Printf("failed to parse deadline time to desired format: %s", err)
		return
	}

	year, month, day := deadline.Date()
	formattedDeadline := fmt.Sprintf("%02d/%02d/%d", day, int(month), year)

	newTask := Todo {
					Task: r.Form.Get("task"),
					Deadline: formattedDeadline,
					Id: len(listOfTasks),
	}

	listOfTasks = append(listOfTasks, newTask)

	_, err = fmt.Fprintf(w,
			`<tr>
				<td>
					%s
				</td>
				<td>
					%s
				</td>
				<td>
					<button type="submit" class="remove_task" id="%d">Remove Task</button>
				</td>
			</tr>`,
			newTask.Task, newTask.Deadline, newTask.Id)

	if err != nil {
		fmt.Printf("unable to format html return from server: %s", err)
		return
	}
}

func homePageHandler(w http.ResponseWriter, r *http.Request) {
	if err := homePage.Execute(w, listOfTasks); err != nil {
		fmt.Printf("failed to execute template: %s", err)
		return
	}
}

func deleteHandler(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("failed to ready delete body")
		return
	}

	id, err := strconv.Atoi(string(body))
	if err != nil {
		fmt.Printf("unable to convert body to id: %s", err)
		return
	}

	listOfTasks[id] = Todo{}
}




















