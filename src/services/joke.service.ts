import {Injectable} from '@nestjs/common';
import {Joke} from '../entities/joke.entity';
import {getRepository, getConnection} from 'typeorm';
import {User} from '../entities/user.entity';
import {Category} from '../entities/category.entity';
import {Rate} from '../entities/rate.entity';
import {Report} from "../entities/report.entity";

@Injectable()
export class JokeService {

    async getJokesByUserId(userId: number) {
        const jokeRepo = await getRepository(Joke);
        const jokes = await jokeRepo.find({where: {user: userId}});
        return jokes;
    }

    async postJokeByUser(uid: number, jokeText: string) {
        const jokeRepo = await getRepository(Joke);
        const userRepo = await getRepository(User);

        const userPosted = await userRepo.findOne({where: {userId: uid}});

        const newJoke = new Joke();

        newJoke.user = userPosted;
        newJoke.text = jokeText;

        return await jokeRepo.insert(newJoke);
    }

    // get number of jokes posted by a user
    async getNumberOfJokesPosted(userId: number) {
        const count = await getRepository(Joke)
            .createQueryBuilder('joke')
            .select('COUNT(*)', 'count')
            .where({user: userId})
            .getRawOne();

        return count['count'];
    }

    // this service gets average ratings of all user jokes
    async getAverageOfJokesPosted(userId: number) {
        const avg = await getConnection()
            .query
            ('select round(ifnull(avg(avgs),0.000),2) avgRating from (select avg(rating) avgs  from rate join joke on (joke.jokeId = rate.jokeJokeId)'
                + ' where joke.userUserId = ? '
                + ' group by (rate.jokeJokeId)) t', [userId]);

        return avg[0]['avgRating'];
    }

    // this service is to fetch top 10 jokes posted by the user
    async getTopRatedJokes(userId: number) {
        const topJokes = await getConnection()
            .query
            ('select joke.text,avg(rating) avgs from joke left join rate on (joke.jokeId = rate.jokeJokeId)' +
                'where joke.userUserId = ?' +
                'group by (joke.jokeId) order by avgs desc limit 10;', [userId]);

        return topJokes;
    }

    async getFavoriteCategories(userId: number) {
        const categories = await getConnection()
            .query
            ('select category.name as name' +
                ' from rate left join user on (rate.userUserId = user.userId)' +
                ' left join joke_categories_category on (joke_categories_category.jokeJokeId = rate.jokeJokeId)' +
                ' left join category on (category.categoryId = joke_categories_category.categoryCategoryId)' +
                ' where rate.userUserId = ?' +
                ' group by category.name order by count(*) desc limit 3;' , [userId]);

        return categories;
    }

    async getTenRandomJokes() {
        const jokes = await getConnection()
            .query
            ('select j.jokeId, j.text, category.name as "Category",u.username, u.userId, round(ifnull(avg(r.rating),0),2) avgRating, date(j.dateCreated) timeStamp ' +
       'from joke j join user u on (j.userUserId = u.userId) ' +
        'left join rate r on (j.jokeId = r.jokeJokeId) ' +
        'left join joke_categories_category on (j.jokeId = joke_categories_category.jokeJokeId) ' +
        'left join category on (joke_categories_category.categoryCategoryId = category.categoryId) ' +
        'group by j.jokeId, category.name order by rand() limit 10;');

        return jokes;
    }

    // gets back jokeId, categoryId, text for the given category
    async getJokesForCategory(categoryId: number) {
        const data = await getConnection()
            .query
            ('select j.jokeId, jc.categoryCategoryId, j.text, round(ifnull(avg(r.rating),0),2) avgRating, date(j.dateCreated) posted, ' +
                'u.username, u.userId from joke j join joke_categories_category jc ' +
                'on (j.jokeId = jc.jokeJokeId) ' +
                'left join rate r on (j.jokeId = r.jokeJokeId) ' +
                'left join user u on (j.userUserId = u.userId) ' +
                'where jc.categoryCategoryId = ? ' +
                'group by (j.jokeId) order by avgRating desc, posted desc;', [categoryId]);
        return data;
    }

    async getJokesForUsername(username: string) {
        const data = await getConnection()
            .query
            ('select j.jokeId, j.text, ifnull(avg(r.rating),0) avgRating, date(j.dateCreated) posted, ' +
                'u.username, u.userId from joke j ' +
                'left join rate r on (j.jokeId = r.jokeJokeId) ' +
                'join user u on (j.userUserId = u.userId) where u.username = ? ' +
                'group by (j.jokeId) order by avgRating desc;', [username]);
        return data;
    }

    async getCategories() {
        const categories = await getConnection()
            .query
            ('select categoryId, name from category');
        return categories;
    }

    async postJoke(newJoke: any, userId: number) {

        const userPostedBy = await getRepository(User).findOne({where: {userId}});
        const categoryOfJoke = await getRepository(Category).findOne({where: {categoryId: newJoke.categoryId}});

        const newJokeToInsert = new Joke();
        newJokeToInsert.user = userPostedBy;
        newJokeToInsert.text = newJoke.text;
        newJokeToInsert.categories = [categoryOfJoke];

        const res = await getRepository(Joke).save(newJokeToInsert);
        return res;
    }

    async reportJoke(report: any) {
        console.log(report)
        let userId = report.userId
        let jokeId = report.jokeId

        const userPostedBy = await getRepository(User).findOne({where: {userId: report.userId}});
        const joke = await getRepository(Joke).findOne({where: {jokeId: report.jokeId}});

        const newReport = new Report();
        newReport.user = userPostedBy;
        newReport.joke = joke;
        newReport.description = "";
        console.log(newReport)

        const res = await getRepository(Report).save(newReport);
        return res;

    }





    // gives top rated jokes for a month
    async getTopTenOfMonth() {
        const jokes = await getConnection()
            .query
            ('select j.jokeId, j.text, ifnull(avg(r.rating),0) avgRating, day(j.dateCreated) posted, ' +
                'u.username, u.userId from joke j left join rate r on (j.jokeId = r.jokeJokeId) ' +
                'join user u on (j.userUserId = u.userId) ' +
                'where month(now()) = month(j.dateCreated) ' +
                'group by (j.jokeId) order by avgRating desc limit 10;');
        return jokes;
    }

    // gives top rated jokes for a year
    async getTopTenOfYear() {
        const jokes = await getConnection()
            .query
            ('select j.jokeId, j.text, ifnull(avg(r.rating),0) avgRating, day(j.dateCreated) posted, ' +
                'u.username, u.userId from joke j left join rate r on (j.jokeId = r.jokeJokeId) ' +
                'join user u on (j.userUserId = u.userId) ' +
                'where year(now()) = year(j.dateCreated) ' +
                'group by (j.jokeId) order by avgRating desc limit 10;');
        return jokes;
    }

    // gives top rated jokes for a year
    async getTopTenOfAllTime() {
        const jokes = await getConnection()
            .query
            ('select j.jokeId, j.text, ifnull(avg(r.rating),0) avgRating, day(j.dateCreated) posted, ' +
                'u.username, u.userId from joke j left join rate r on (j.jokeId = r.jokeJokeId) ' +
                'join user u on (j.userUserId = u.userId) ' +
                'group by (j.jokeId) order by avgRating desc limit 10;');
        return jokes;
    }

    async rateJoke(rate: any, userId: number) {

        const userRanked = await getRepository(User).findOne({where: {userId}});
        const jokeRated = await getRepository(Joke).findOne({where: {jokeId: rate.jokeId}});

        const newRating = new Rate();
        newRating.user = userRanked;
        newRating.joke = jokeRated;
        newRating.rating = rate.rating;

        await getConnection().query('Delete from rate where userUserId = ? and jokeJokeId = ?', [userId, rate.jokeId]);

        const res = await getRepository(Rate).save(newRating);
        return res;
    }
}
