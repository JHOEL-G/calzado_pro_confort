export function formatDate(date: Date) {
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    const days = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${days} ${month}, ${year}`
}