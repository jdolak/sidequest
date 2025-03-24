from flask import Flask, render_template, request, redirect, url_for, flash, Blueprint

main_bp = Blueprint('main', __name__)

@main_bp.route("/")
def home():
    #return render_template("index.html")
    return "<h1>Sidequest</h1>"
