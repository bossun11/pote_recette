namespace :update_shops do
  desc "Google Place APIから店舗情報を更新"
  task update: :environment do
    Shop.find_each do |shop|
      res_body = GoogleMapsService.get_shop_details(shop.place_id)
      result = JSON.parse(res_body)["result"]

      shop.update(
        name: result["name"],
        formatted_address: result["formatted_address"],
        website: result['website'],
        rating: result['rating'],
        user_ratings_total: result['user_ratings_total']
      )

      if result['reviews'].present?
        result['reviews'].each do |google_review|
          review = shop.reviews.find_or_initialize_by(time: google_review['text'])
          if review.new_record?
            review.text = google_review['text']
            review.relative_time_description = google_review['relative_time_description']
            review.time = google_review['time']
            review.save
          else
            shop.reviews.update(text: google_review['time'], relative_time_description: google_review['relative_time_description'])
          end
        end
      end
    end
  end
end
